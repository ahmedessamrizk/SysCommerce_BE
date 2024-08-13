import { asyncHandler } from '../../utils/errorHandlingService.js';
import * as categoriesService from './categories.service.js';
import { createResponse } from '../../utils/createResponse.js';

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoriesService.create(req.body, req.user);
  return res.status(201).json(
    createResponse(201, {
      category
    })
  );
});

export const getCategories = asyncHandler(async (req, res) => {
  const result = await categoriesService.getCategories(req.query);
  return res.status(200).json(createResponse(200, result));
});

export const getCategory = asyncHandler(async (req, res) => {
  const result = await categoriesService.getCategory({ _id: req.params.id });
  return res.status(200).json(createResponse(200, { category: result }));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoriesService.updateCategory(
    req.params.id,
    req.body
  );
  return res.status(200).json(
    createResponse(200, {
      category
    })
  );
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await categoriesService.deleteCategory(req.params.id);
  return res.status(204).json(createResponse(204));
});
