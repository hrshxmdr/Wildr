import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const Toaster = ({ show, variant = 'success', message = '', onClose }) => (
  <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
    <Toast bg={variant === 'danger' ? 'danger' : variant} show={show} onClose={onClose} delay={3000} autohide>
      <Toast.Body className="text-white">{message}</Toast.Body>
    </Toast>
  </ToastContainer>
);

export default Toaster;
