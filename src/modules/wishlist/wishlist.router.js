import { Router } from 'express';
import * as wishlistController from './wishlist.controller.js';
import * as wishlistValidators from './wishlist.validation.js';
import { validation } from '../../middleware/validation.js';
import { auth, roles } from '../../middleware/auth.js';

const router = Router();

router.post(
  '/',
  auth([roles.User]),
  validation(wishlistValidators.addToWishListSchema),
  wishlistController.addToWishList
);

router.get(
  '/',
  validation(wishlistValidators.getWishlistSchema),
  auth([roles.User]),
  wishlistController.getWishList
);

router.delete(
  '/',
  auth([roles.User]),
  validation(wishlistValidators.removeFromWishListSchema),
  wishlistController.removeFromWishList
);

export default router;
