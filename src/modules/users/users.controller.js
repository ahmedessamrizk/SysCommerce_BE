import { roles } from '../../middleware/auth.js';
import { createResponse } from '../../utils/createResponse.js';
import { asyncHandler } from '../../utils/errorHandlingService.js';
import * as usersService from './users.service.js';

export const getProfile = asyncHandler(async (req, res) => {
  return res.json(createResponse(200, { user: req.user }));
});

export const logout = asyncHandler(async (req, res) => {
  return res.clearCookie('token').json(createResponse(200));
});

export const getUsers = asyncHandler(async (req, res) => {
  const { page, size } = req.query;
  const users = await usersService.getUsers({ page, size });
  return res.json(createResponse(200, { total: users.length, users }));
});

export const removeUser = asyncHandler(async (req, res) => {
  await usersService.removeUser(req.params.id, roles.User);
  return res.status(204).json(createResponse(204));
});
