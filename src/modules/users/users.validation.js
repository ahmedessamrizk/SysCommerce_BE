import yup from 'yup';

export const getUsersSchema = {
  query: yup.object().shape({
    page: yup
      .string()
      .matches(/^\d+$/, 'Page must be a number')
      .optional(),
    size: yup
      .string()
      .matches(/^\d+$/, 'Size must be a number')
      .optional()
  })
};
