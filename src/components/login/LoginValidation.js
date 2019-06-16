import Yup from 'yup';

const LoginValidation = Yup.object().shape({
  email: Yup
    .string()
    .email("Enter a valid email")
    .required("Required field"),
  password: Yup
    .string()
    .required("Required field"),
});

export default LoginValidation;