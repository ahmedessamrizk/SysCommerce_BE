import { Router } from 'express';
import { auth, roles } from '../../middleware/auth.js';
import * as adminsController from './admins.controller.js';
import * as adminsValidators from './admins.validation.js';
import { validation } from '../../middleware/validation.js';

const router = Router();

router.post(
  '/',
  validation(adminsValidators.createAdminSchema),
  auth([roles.SuperAdmin]),
  adminsController.createAdmin
);

router.get(
  '/',
  validation(adminsValidators.getAdminsSchema),
  auth([roles.SuperAdmin]),
  adminsController.getAll
);

router.patch(
  '/:id',
  validation(adminsValidators.updateRoleSchema),
  auth([roles.SuperAdmin]),
  adminsController.updateRole
);

router.patch(
  '/:id/remove',
  validation(adminsValidators.removeAdminSchema),
  auth([roles.SuperAdmin]),
  adminsController.removeAdmin
);

router.patch(
  '/:id/unremove',
  validation(adminsValidators.removeAdminSchema),
  auth([roles.SuperAdmin]),
  adminsController.unRemoveAdmin
);

export default router;
