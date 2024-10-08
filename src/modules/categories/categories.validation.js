import yup from 'yup';

const objectIdSchema = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
  .nullable(true);

export const createCategorySchema = {
  body: yup
    .object()
    .shape({
      name: yup.string().required('Name is required'),
      parentCategory: objectIdSchema
    })
    .noUnknown(true, 'Unknown field in request body')
    .strict()
};

export const getCategoriesSchema = {
  query: yup.object().shape({
    page: yup.number().min(1),
    size: yup.number().min(1)
  })
};

export const getCategorySchema = {
  params: yup.object().shape({
    id: objectIdSchema
  })
};

export const updateCategorySchema = {
  params: yup.object().shape({
    id: objectIdSchema
  }),
  body: yup
    .object()
    .shape({
      name: yup.string().required('Category name is required')
    })
    .noUnknown(true, 'Unknown field in request body')
    .strict()
};

export const deleteCategorySchema = {
  params: yup.object().shape({
    id: objectIdSchema
  })
};
