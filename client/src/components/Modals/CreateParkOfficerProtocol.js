import React from 'react';
import Modal from 'react-modal';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import { protocolValidationSchema } from '../../schemas/protocolValidation';
import { useDispatch } from 'react-redux';
import { createProtocol } from '../../redux/slices/protocolSlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
  },
};

const initialValues = {
    serviceNotes: '',
    fineAmount: '',
    violatorFullName: '',
    violatorPassportNumber: ''
}


Modal.setAppElement('#root');

const CreateParkOfficerProtocol = ({open,setIsOpen,parkOfficerId}) => {
    const dispatch = useDispatch();
    const submitFromHandler = async(values)=>{
        try {
            await dispatch(createProtocol({parkOfficerId,protocolBody: values}))
            setIsOpen(false)
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
            <Formik
            initialValues={initialValues}
            validationSchema={protocolValidationSchema}
            onSubmit={submitFromHandler}
            >
                {(formikProps)=>(
                    <Form>
                        <label>Service notes: 
                            <Field name='serviceNotes'/>
                            <ErrorMessage name='serviceNotes'/>
                        </label>
                        <label> Fine amount: 
                            <Field name='fineAmount'/>
                            <ErrorMessage name='fineAmount'/>
                        </label>
                        <label>Violator full name: 
                            <Field name='violatorFullName'/>
                            <ErrorMessage name='violatorFullName'/>
                        </label>
                        <label>Violator passport number
                            <Field name='violatorPassportNumber'/>
                            <ErrorMessage name='violatorPassportNumber'/>
                        </label>
                        <button type='submit'>Create</button>
                        <button onClick={()=>setIsOpen(false)}>Close</button>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default CreateParkOfficerProtocol;
