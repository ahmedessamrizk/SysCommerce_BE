import { Router } from 'express';
import authRouter from './auth/auth.router.js';
import usersRouter from './users/users.router.js';
import adminsRouter from './admins/admins.router.js';

const router = Router();

router.use(`/auth`, authRouter);
router.use(`/users`, usersRouter);
router.use('/admins', adminsRouter);

export default router;
