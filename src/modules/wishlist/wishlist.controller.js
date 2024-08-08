import * as wishlistService from './wishlist.service.js';
import { asyncHandler } from '../../utils/errorHandlingService.js';
import { createResponse } from '../../utils/createResponse.js';

export const addToWishList = asyncHandler(async (req, res) => {
  await wishlistService.addToWishList(req.body.product, req.user);
  return res.status(201).json(createResponse(201));
});

export const getWishList = asyncHandler(async (req, res) => {
  const wishList = await wishlistService.getWishList(req.query, req.user);
  return res
    .status(200)
    .json(createResponse(200, { total: wishList.length, wishList }));
});

export const removeFromWishList = asyncHandler(async (req, res) => {
  await wishlistService.removeFromWishList(req.body.product, req.user);
  return res.status(204).json(createResponse(204));
});
