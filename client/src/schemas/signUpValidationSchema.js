import * as yup from "yup";

export const signUpValidationSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim()
    .required()
    .min(3, "Nick name must be at least 2 characters"),
  email: yup.string().required().email(),
  password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Password must be at least 8 characters long, including upper and lower case letters, numbers and special characters (#?!@$ %^&*-)')
    .required()
    .trim(),
});
