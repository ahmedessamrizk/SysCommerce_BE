import { Router } from 'express';
import { validation } from '../../middleware/validation.js';
import * as authValidators from './auth.validation.js';
import * as authController from './auth.controller.js';

const router = Router();

router.post(
  '/register',
  validation(authValidators.signupSchema),
  authController.signUp
);

router.get(
  '/confirm/:token',
  validation(authValidators.confirmEmailSchema),
  authController.confirmEmail
);

router.post(
  '/confirm/:token',
  validation(authValidators.confirmEmailSchema),
  authController.confirmEmail
);

router.post(
  '/signin',
  validation(authValidators.signInSchema),
  authController.signIn
);

export default router;
