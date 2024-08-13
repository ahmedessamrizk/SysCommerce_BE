import yup from 'yup';

const objectIdSchema = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

export const createProductSchema = {
  body: yup
    .object()
    .shape({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup
        .number()
        .min(1)
        .required(),
      category: objectIdSchema.required()
    })
    .noUnknown(true, 'Unknown field in request body')
    .strict()
};

export const updateProductSchema = {
  params: yup.object().shape({
    id: objectIdSchema
  }),
  body: yup
    .object()
    .shape({
      name: yup.string(),
      description: yup.string(),
      price: yup.number().min(1),
      category: objectIdSchema
    })
    .noUnknown(true, 'Unknown field in request body')
    .strict()
};

export const deleteProductSchema = {
  params: yup.object().shape({
    id: objectIdSchema.required()
  })
};

export const getProductsSchema = {
  query: yup.object().shape({
    category: yup.string(),
    page: yup.number().min(1),
    size: yup.number().min(1)
  })
};

export const getProductSchema = {
  params: yup.object().shape({
    id: objectIdSchema.required()
  })
};
