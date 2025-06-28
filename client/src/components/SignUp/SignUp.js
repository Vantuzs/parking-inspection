import React from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import { signUpValidationSchema } from '../../schemas/signUpValidationSchema';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slices/userSlice';

const initialValues = {
    nickname: '',
    email: '',
    password: ''
}


const SignUp = () => {
    const dispatch = useDispatch()

    const handleSumbitSignUp = async(values,{resetForm})=>{
        await dispatch(registerUser(values))
        resetForm()
    }

    return (
        <>
         <h2>SignUp</h2>   
         <Formik
         initialValues={initialValues}
         onSubmit={handleSumbitSignUp}
         validationSchema={signUpValidationSchema}
         >
            {(formikProps)=>(
                <Form>
                    <label>
                        Nickname:
                        <Field name='nickname' placeholder='Super User 123'/>
                        <ErrorMessage name='nickname'/>
                    </label>
                    <label>
                        Email:
                        <Field name='email' placeholder='words@gmail.com'/>
                        <ErrorMessage name='email'/>
                    </label>
                    <label>
                        Passowrd:
                        <Field name='password' placeholder='qwerty123!'/>
                        <ErrorMessage name='password'/>
                    </label>
                    <button type="submit">Submit</button>
                </Form>
            )}
         </Formik>
        </>
    );
}

export default SignUp;
