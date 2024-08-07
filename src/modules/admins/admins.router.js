import { Router } from 'express';
import { auth, roles } from '../../middleware/auth.js';
import * as adminsController from './admins.controller.js';
import * as adminsValidators from './admins.validation.js';

const router = Router();



export default router;
