import { roles } from '../../middleware/auth.js';
import * as usersService from '../users/users.service.js';

export const create = async admin => {
  admin.role = roles.Admin;
  admin.isConfirmed = true;
  return await usersService.createUser(admin);
};

export const getAdmins = async (query, currUser) => {
  let select = '';

  if (currUser.role === roles.Admin) {
    select = ' -isDeleted -role';
  }
  return await usersService.getUsers(query, roles.Admin, select);
};

export const updateRole = async (id, role) => {
  return await usersService.updateRole(id, role);
};

export const removeAdmin = async (id, isDeleted) => {
  //TODO: need to delete all categories, created by this admin.
  return await usersService.removeUser(id, roles.Admin, isDeleted);
};
