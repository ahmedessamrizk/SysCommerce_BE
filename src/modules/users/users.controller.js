import { createResponse } from '../../utils/createResponse.js';
import { asyncHandler } from '../../utils/errorHandlingService.js';

export const getProfile = asyncHandler(async (req, res) => {
  return res.json(createResponse(200, { user: req.user }));
});

export const logout = asyncHandler(async (req, res) => {
  return res.clearCookie('token').json(createResponse(200));
});
