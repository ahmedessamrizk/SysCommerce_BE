import * as productsService from './products.service.js';
import { asyncHandler } from '../../utils/errorHandlingService.js';
import { createResponse } from '../../utils/createResponse.js';

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productsService.createProduct(req.body, req.user);
  return res.status(201).json(createResponse(201, { product }));
});

export const getProducts = asyncHandler(async (req, res) => {
  const result = await productsService.getProducts(req.query);
  return res.status(200).json(createResponse(200, result));
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productsService.getProduct({ _id: req.params.id });
  if (!product) {
    throw Error('Product not found', { cause: 404 });
  }
  return res.status(200).json(createResponse(200, { product }));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productsService.updateProduct(
    req.params.id,
    req.body,
    req.user
  );
  return res.status(200).json(createResponse(200, { product }));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productsService.deleteProduct(req.params.id, req.user);
  return res.status(204).json(createResponse(204));
});
