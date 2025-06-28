import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "../../schemas/signInValidationSchema";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";

const initialValues = {
  email: "",
  password: "",
};


const SignIn = () => {
    
    const dispatch = useDispatch()
    
    const handlerSumbitSignIn = async (values, { resetForm }) => {
        await dispatch(loginUser(values))
      resetForm();
    };
  return (
    <>
    <h2>SignIn</h2>
    <Formik initialValues={initialValues} onSubmit={handlerSumbitSignIn} validationSchema={signInValidationSchema}>
      {(formikProps) => (
          <Form>
          <label>
            Email:
            <Field name="email" placeholder="words@gmail.com" />
            <ErrorMessage name="email" />
          </label>
          <label>
            Passowrd:
            <Field name="password" placeholder="qwerty123!" />
            <ErrorMessage name="password" />
          </label>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    </>
  );
};

export default SignIn;
