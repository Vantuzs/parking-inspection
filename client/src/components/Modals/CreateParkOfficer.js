import React from 'react';
import Modal from 'react-modal';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { createParkOfficer,getParkOfficers } from '../../redux/slices/parkOfficerSlice';
import { useDispatch } from 'react-redux';
import { parkOfficerValidationShcema } from '../../schemas/parkOfficerValidationSchema';

const initialValues = {
    fullName: '',
    badgeNumber: '',
    district: ''
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    // flexDirection: 'column'
  },
};

Modal.setAppElement('#root');

const CreateParkOfficer = ({open,setIsOpen}) => {
    const dispatch = useDispatch();
    const handleCreateParkOfficerSubmit = async (values,{ resetFrom })=>{
        try {
            await dispatch(createParkOfficer(values))
            await dispatch(getParkOfficers())
            setIsOpen(false)
            resetFrom()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
        isOpen={open}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        >
            <h2>Create officer</h2>
            <Formik
             initialValues={initialValues}
             validationSchema={parkOfficerValidationShcema}
             onSubmit={handleCreateParkOfficerSubmit}
            >
                {(formikProps)=>(
                    <Form>
                        <label>Full name: 
                            <Field name='fullName'/>
                            <ErrorMessage name='fullName'/>
                        </label>
                        <label>Badge number: 
                            <Field name='badgeNumber'/>
                            <ErrorMessage name='badgeNumber'/>
                        </label>
                        <label>District: 
                            <Field name='district'/>
                            <ErrorMessage name='district'/>
                        </label>
                        <button type='submit'>Add officer</button>
                        <button type='button' onClick={()=>setIsOpen(false)}>Close</button>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default CreateParkOfficer;
