import { userModel } from '../../../DB/models/user.model.js';
import { roles } from '../../middleware/auth.js';
import { paginate } from '../../utils/pagination.js';

const privateData = '-password -__v -isConfirmed';

export const createUser = async user => {
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

export const getUsers = async query => {
  const { limit, skip } = paginate(query.page, query.size);
  const users = await userModel
    .find({ isConfirmed: true })
    .limit(limit)
    .skip(skip)
    .select(privateData);
  return users;
};

export const removeUser = async id => {
  const user = await getUser({ _id: id, isConfirmed: true });

  //Check if user exists.
  if (!user) {
    throw new Error('Invalid user id', { cause: 404 });
  }

  //Check if the role to be deleted is user.
  if (user.role !== roles.User) {
    throw new Error('You are not authorized to delete this user', {
      cause: 403
    });
  }
  await userModel.findByIdAndDelete(id);
};
