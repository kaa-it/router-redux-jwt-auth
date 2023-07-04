import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import { MODAL_PORTAL_EL } from '../utils/config';
import { Form, useNavigate } from 'react-router-dom';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  background-color: rgba(0 0 0 / 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  width: clamp(50%, 720px, 90%);
  background-color: white;
  z-index: 200000;
  border: 1px solid rgb(60, 60, 60);
  border-radius: 30px;
  padding: 40px 40px 60px 40px;
  box-sizing: border-box;
  box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const Modal = ({ children }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return createPortal(
    <Overlay>
      <ModalWrapper>
        {/*  */}
        <button type="button" onClick={handleClose}>
          close
        </button>
        <Content>{children}</Content>
      </ModalWrapper>
    </Overlay>,
    MODAL_PORTAL_EL
  );
};
