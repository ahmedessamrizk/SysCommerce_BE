import { Router } from 'express';
import { validation } from '../../middleware/validation.js';
import * as categoriesController from './categories.controller.js';
import * as categoriesValidators from './categories.validation.js';
import { auth, roles } from '../../middleware/auth.js';

const router = Router();

router.post(
  '/',
  validation(categoriesValidators.createCategorySchema),
  auth([roles.Admin, roles.SuperAdmin]),
  categoriesController.createCategory
);

router.get(
  '/',
  validation(categoriesValidators.getCategoriesSchema),
  categoriesController.getCategories
);

router.get(
  '/:id',
  validation(categoriesValidators.getCategorySchema),
  categoriesController.getCategory
);

router.patch(
  '/:id',
  validation(categoriesValidators.updateCategorySchema),
  auth([roles.Admin, roles.SuperAdmin]),
  categoriesController.updateCategory
);

router.delete(
  '/:id',
  validation(categoriesValidators.deleteCategorySchema),
  auth([roles.Admin, roles.SuperAdmin]),
  categoriesController.deleteCategory
);

export default router;
