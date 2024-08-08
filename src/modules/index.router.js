import { Router } from 'express';
import authRouter from './auth/auth.router.js';
import usersRouter from './users/users.router.js';
import adminsRouter from './admins/admins.router.js';
import categoriesRouter from './categories/categories.router.js';
import productsRouter from './products/products.router.js';
import wishlistRouter from './wishlist/wishlist.router.js';

const router = Router();

router.use(`/auth`, authRouter);
router.use(`/users`, usersRouter);
router.use('/admins', adminsRouter);
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/wishlist', wishlistRouter);

export default router;
