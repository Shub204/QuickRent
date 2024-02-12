// ModalComponent.js
import React from 'react';
import { useModal } from './ModalContext';

const ModalComponent = () => {
  const { modalIsOpen, closeModal, modalContent } = useModal();

  if (!modalIsOpen) {
    return null;
  }

  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={closeModal}>Close</button>
        {modalContent}
      </div>
    </div>
  );
};

export default ModalComponent;
