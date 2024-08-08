import { Router } from 'express';
import * as productsController from './products.controller.js';
import * as productsValidators from './products.validation.js';
import { auth, roles } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';

const router = Router();

router.post(
  '/',
  validation(productsValidators.createProductSchema),
  auth([roles.User]),
  productsController.createProduct
);

router.get(
  '/',
  validation(productsValidators.getProductsSchema),
  productsController.getProducts
);

router.patch(
  '/:id',
  validation(productsValidators.updateProductSchema),
  auth([roles.User]),
  productsController.updateProduct
);

router.delete(
  '/:id',
  validation(productsValidators.deleteProductSchema),
  auth([roles.User, roles.Admin, roles.SuperAdmin]),
  productsController.deleteProduct
);

export default router;
