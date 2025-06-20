import React from "react";
import Modal from "react-modal";
import { parkOfficerValidationShcema } from "../../schemas/parkOfficerValidationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import {
  updateParkOfficer,
  getParkOfficers,
} from "../../redux/slices/parkOfficerSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "block",
    // flexDirection: 'column'
  },
};

Modal.setAppElement("#root");

const UpdateParkOfficer = ({ open, setIsOpen, officer }) => {
  const dispatch = useDispatch();
  const initialValues = {
    fullName: officer.fullName,
    badgeNumber: officer.badgeNumber,
    district: officer.district,
  };

  const handlerUpdateForm = async (values, { resetForm }) => {
    await dispatch(updateParkOfficer({parkOfficerId: officer.id,updatedData: values}));
    await dispatch(getParkOfficers());
    setIsOpen(false);
    resetForm();
  };
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <h2>Edit officer</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={parkOfficerValidationShcema}
        onSubmit={handlerUpdateForm}
      >
        {(formikProps) => (
          <Form>
            <label>
              Full name:
              <Field name="fullName" />
              <ErrorMessage name="fullName" />
            </label>
            <label>
              Badge number:
              <Field name="badgeNumber" />
              <ErrorMessage name="badgeNumber" />
            </label>
            <label>
              District:
              <Field name="district" />
              <ErrorMessage name="district" />
            </label>
            <button type="submit">Edit officer</button>
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateParkOfficer;
