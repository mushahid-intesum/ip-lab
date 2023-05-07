import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {MdOutlineCancel} from 'react-icons/md';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <ModalWrapper>
      <ModalContent>
        <div className="flex justify-end">
            <button style={{ color: 'black', borderRadius: '50%' }}
                className="text-2xl text-black p-3 hover:drop-shadow-xl hover:bg-light-gray" onClick={() => onClose()}>
                <MdOutlineCancel />
            </button>
        </div>
        {children}
      </ModalContent>
    </ModalWrapper>,
    document.getElementById('modal-root')
  );
};

export default Modal;
