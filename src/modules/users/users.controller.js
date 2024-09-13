import { roles } from '../../middleware/auth.js';
import { createResponse } from '../../utils/createResponse.js';
import { asyncHandler } from '../../utils/errorHandlingService.js';
import * as usersService from './users.service.js';

export const getProfile = asyncHandler(async (req, res) => {
  return res.json(createResponse(200, { user: req.user }));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true, // Prevents client-side scripts from accessing the cookie
    sameSite: 'none', // Helps prevent CSRF attacks
    secure: true, // Ensures the cookie is sent over HTTPS in production
    path: '/' // Scope of the cookie
  });
  res.cookie('token2222222', 'test', {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });
  return res.json(createResponse(200));
});

export const getUsers = asyncHandler(async (req, res) => {
  const { page, size } = req.query;
  const result = await usersService.getUsers({ page, size });
  return res.json(createResponse(200, result));
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await usersService.getUser(
    { _id: req.params.id },
    '-password -__v -isConfirmed'
  );

  if (!user) {
    throw new Error('User not found', { cause: 404 });
  }
  return res.json(createResponse(200, { user }));
});

export const removeUser = asyncHandler(async (req, res) => {
  await usersService.removeUser(req.params.id, roles.User, true);
  return res.status(200).json(createResponse(200));
});

export const unRemoveUser = asyncHandler(async (req, res) => {
  await usersService.removeUser(req.params.id, roles.User, false);
  return res.status(200).json(createResponse(200));
});
