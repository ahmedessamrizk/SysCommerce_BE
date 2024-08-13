import { roles } from '../../middleware/auth.js';
import * as usersService from '../users/users.service.js';
import * as categoriesService from '../categories/categories.service.js';

export const create = async admin => {
  admin.role = roles.Admin;
  admin.isConfirmed = true;
  return await usersService.createUser(admin);
};

export const get = async query => {
  const { total, totalPages, users } = await usersService.getAll(query);
  return { total, totalPages, users };
};

export const getPanelCategories = async () => {
  return await categoriesService.getAllCategories();
};

export const updateRole = async (id, role) => {
  return await usersService.updateRole(id, role);
};

export const removeAdmin = async (id, isDeleted) => {
  const roleToDelete = await usersService.getUser({ _id: id }, 'role');
  if (!roleToDelete || roleToDelete.role === roles.SuperAdmin) {
    throw new Error('User not found', { cause: 404 });
  }

  return await usersService.removeUser(id, roleToDelete.role, isDeleted);
};
