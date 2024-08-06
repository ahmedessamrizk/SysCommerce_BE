import { Router } from 'express';
import { auth, roles } from '../../middleware/auth.js';
import * as usersController from './users.controller.js';

const router = Router();

router.get(
  '/profile',
  auth(roles.User, roles.Admin, roles.SuperAdmin),
  usersController.getProfile
);

router.get(
  '/logout',
  auth(roles.User, roles.Admin, roles.SuperAdmin),
  usersController.logout
);

export default router;
