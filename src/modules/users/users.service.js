import { userModel } from '../../../DB/models/user.model.js';
import { roles } from '../../middleware/auth.js';
import { paginate } from '../../utils/pagination.js';
import bcrypt from 'bcryptjs';

const privateData = '-password -__v -isConfirmed';

export const createUser = async user => {
  let { email, userName, password } = user;

  userName = userName.toLowerCase();
  email = email.toLowerCase();

  //check if email or username already exists
  const valid = await checkValidUser(email, userName);
  if (!valid.status) {
    throw new Error(valid.message, { cause: valid.cause });
  }

  //hash password
  password = await bcrypt.hash(password, +process.env.SALTROUND);

  Object.assign(user, { email, userName, password });

  return await userModel.create(user);
};

export const getUser = async (query, select = null) => {
  const user = await userModel.findOne(query).select(select);
  return user;
};

export const updateUser = async (
  filter,
  data,
  select = '',
  options = { new: true }
) => {
  const user = await userModel
    .findOneAndUpdate(filter, data, options)
    .select(select);
  return user;
};

export const getUsers = async (query, role = roles.User) => {
  const { limit, skip } = paginate(query.page, query.size);
  const users = await userModel
    .find({ isConfirmed: true, role })
    .limit(limit)
    .skip(skip)
    .select(privateData);
  return users;
};

export const removeUser = async (id, roleToDelete) => {
  const user = await getUser({ _id: id, isConfirmed: true });

  //Check if user exists.
  if (!user) {
    throw new Error('Invalid user id', { cause: 404 });
  }

  //Check if the role to be deleted is as expected.
  if (user.role !== roleToDelete) {
    throw new Error(
      `The user being deleted does not match the expected role for this endpoint`,
      {
        cause: 403
      }
    );
  }
  await userModel.findByIdAndDelete(id);
};

export const checkValidUser = async (email, userName) => {
  //check if email or username already exists
  const checkEmail = await getUser({ email }, 'email');
  if (checkEmail) {
    return { status: false, cause: 409, message: 'Email already exists' };
  }

  const checkUserName = await getUser({ userName }, 'userName');
  if (checkUserName) {
    return { status: false, cause: 409, message: 'userName already exists' };
  }

  return { status: true };
};

export const updateRole = async (id, role) => {
  const user = await getUser({ _id: id, isConfirmed: true });
  if (!user) {
    throw new Error('Invalid user id', { cause: 404 });
  }

  return await userModel
    .findByIdAndUpdate(id, { role }, { new: true })
    .select('userName role');
};
