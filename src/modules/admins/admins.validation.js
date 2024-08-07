import yup from 'yup';

export const createAdminSchema = {
  body: yup.object().shape({
    userName: yup
      .string()
      .required('userName is required')
      .min(3, 'userName must be at least 3 characters')
      .max(20, 'userName cannot exceed 20 characters'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('email is required'),
    password: yup
      .string()
      .required('password is required')
      .matches(
        new RegExp(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
        'password must be minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character'
      )
  }),
  cookies: yup.object().shape({
    token: yup.string().required('token is required')
  })
};

export const getAdminsSchema = {
  query: yup.object().shape({
    page: yup
      .string()
      .matches(/^\d+$/, 'page must be a number')
      .optional(),
    size: yup
      .string()
      .matches(/^\d+$/, 'size must be a number')
      .optional()
  }),
  cookies: yup.object().shape({
    token: yup.string().required('token is required')
  })
};

export const updateRoleSchema = {
  params: yup.object().shape({
    id: yup
      .string()
      .required('id is required')
      .matches(/^[0-9a-fA-F]{24}$/, 'Invalid Object Id')
  }),
  body: yup.object().shape({
    role: yup
      .string()
      .required('role is required')
      .matches(/^(Admin|User)$/, 'role must be either Admin or User')
  })
};

export const removeAdminSchema = {
  params: yup.object().shape({
    id: yup
      .string()
      .required('id is required')
      .matches(/^[0-9a-fA-F]{24}$/, 'Invalid Object Id')
  })
};
