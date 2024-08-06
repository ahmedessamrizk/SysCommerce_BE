import { createResponse } from '../../utils/createResponse.js';
import * as authService from './auth.service.js';
import { asyncHandler } from '../../utils/errorHandlingService.js';

export const signUp = asyncHandler(async (req, res, next) => {
  const user = await authService.signUp(req);
  if (user) {
    return res
      .status(201)
      .json(createResponse(201, 'please confirm your email before login'));
  }
  return next(Error('Failed to signUp', { cause: 400 }));
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  await authService.confirmEmail(token);

  return process.env.MODE == 'DEV'
    ? res.status(200).json(createResponse(200))
    : res.redirect(process.env.frontendBaseURL);
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  const token = await authService.signIn(userName, password);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.MODE == 'PROD'
  });
  return res.status(200).json(createResponse(200));
});
