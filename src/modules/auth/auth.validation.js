import yup from 'yup';

export const signupSchema = {
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
  })
};

export const confirmEmailSchema = {
  params: yup.object().shape({
    token: yup.string().required('token is required')
  })
};

export const signInSchema = {
  body: yup.object().shape({
    userName: yup
      .string()
      .required('userName is required')
      .min(3, 'userName must be at least 3 characters')
      .max(20, 'userName cannot exceed 20 characters'),
    password: yup.string().required('password is required')
  })
};
