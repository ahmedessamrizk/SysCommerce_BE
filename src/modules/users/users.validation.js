import yup from 'yup';

export const getUsersSchema = {
  query: yup.object().shape({
    page: yup
      .string()
      .matches(/^\d+$/, 'page must be a number')
      .optional(),
    size: yup
      .string()
      .matches(/^\d+$/, 'size must be a number')
      .optional()
  })
};

export const removeUserSchema = {
  params: yup.object().shape({
    id: yup
      .string()
      .required('id is required')
      .matches(/^[0-9a-fA-F]{24}$/, 'Invalid Object Id')
  })
};
