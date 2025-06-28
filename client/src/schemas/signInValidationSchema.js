import * as yup from "yup";

export const signInValidationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .trim(),
});