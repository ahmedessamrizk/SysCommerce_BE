import { asyncHandler } from '../../utils/errorHandlingService.js';
import { userModel } from '../../../DB/models/user.model.js';

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
  const user = await userModel.findOneAndUpdate(filter, data, options).select(select);
  return user;
};
