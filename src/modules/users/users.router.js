import { Router } from 'express';
import { auth, roles } from '../../middleware/auth.js';
import * as usersController from './users.controller.js';
import * as usersValidators from './users.validation.js';
import { validation } from '../../middleware/validation.js';

const router = Router();

router.get(
  '/profile',
  auth([roles.User, roles.Admin, roles.SuperAdmin]),
  usersController.getProfile
);

router.get(
  '/logout',
  auth([roles.User, roles.Admin, roles.SuperAdmin]),
  usersController.logout
);

router.get(
  '/',
  validation(usersValidators.getUsersSchema),
  auth([roles.Admin, roles.SuperAdmin]),
  usersController.getUsers
);

router.patch(
  '/:id/remove',
  validation(usersValidators.removeUserSchema),
  auth([roles.Admin, roles.SuperAdmin]),
  usersController.removeUser
);

router.patch(
  '/:id/unremove',
  validation(usersValidators.removeUserSchema),
  auth([roles.Admin, roles.SuperAdmin]),
  usersController.unRemoveUser
);

export default router;
