import { roles } from '../../middleware/auth.js';
import * as usersService from '../users/users.service.js';

export const create = async admin => {
  admin.role = roles.Admin;
  admin.isConfirmed = true;
  return await usersService.createUser(admin);
};

export const get = async query => {
  const { total, totalPages, users } = await usersService.getAll(query);
  return { total, totalPages, users };
};

export const updateRole = async (id, role) => {
  return await usersService.updateRole(id, role);
};

export const removeAdmin = async (id, isDeleted) => {
  return await usersService.removeUser(id, roles.Admin, isDeleted);
};
