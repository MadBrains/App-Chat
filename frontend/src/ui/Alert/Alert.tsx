import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Alert: React.FC = () => {
  return (
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} hideProgressBar closeButton={false} />
  );
};

export default Alert;
