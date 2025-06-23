import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import {
  updateProtocolById,
  getAllProtocolsById,
} from "../../redux/slices/protocolSlice";
import { protocolValidationSchema } from "../../schemas/protocolValidation";

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

const UpdateProtocolById = ({ open, setIsOpen, protocol }) => {
  const dispatch = useDispatch();

  const inititalValues = {
    serviceNotes: protocol.serviceNotes,
    fineAmount: protocol.fineAmount,
    violatorFullName: protocol.violatorFullName,
    violatorPassportNumber: protocol.violatorPassportNumber,
  };

  const editProtocolHandler = async (values) => {
    await dispatch(
      updateProtocolById({
        parkOfficerId: protocol.officerId,
        protocolId: protocol.id,
        protocolBody: values,
      })
    );
    await dispatch(getAllProtocolsById(protocol.officerId));
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <Formik
        initialValues={inititalValues}
        validationSchema={protocolValidationSchema}
        onSubmit={editProtocolHandler}
      >
        {(formikProps) => (
          <Form>
            <label>
              Service notes:
              <Field name="serviceNotes" />
              <ErrorMessage name="serviceNotes" />
            </label>
            <label>
              {" "}
              Fine amount:
              <Field name="fineAmount" />
              <ErrorMessage name="fineAmount" />
            </label>
            <label>
              Violator full name:
              <Field name="violatorFullName" />
              <ErrorMessage name="violatorFullName" />
            </label>
            <label>
              Violator passport number
              <Field name="violatorPassportNumber" />
              <ErrorMessage name="violatorPassportNumber" />
            </label>
            <button type="submit">
              Edit
            </button>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateProtocolById;
