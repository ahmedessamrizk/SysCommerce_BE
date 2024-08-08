import yup from 'yup';

const objectIdSchema = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

export const addToWishListSchema = {
  body: yup
    .object()
    .shape({
      product: objectIdSchema.required()
    })
    .noUnknown(true, 'Unknown field in request body')
    .strict()
};

export const getWishlistSchema = {
  query: yup.object().shape({
    category: yup.string(),
    page: yup.number().min(1),
    size: yup.number().min(1)
  })
};

export const removeFromWishListSchema = {
  body: yup
    .object()
    .shape({
      product: objectIdSchema.required()
    })
    .noUnknown(true, 'Unknown field in request body')
    .strict()
};
