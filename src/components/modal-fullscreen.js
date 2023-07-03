import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import { MODAL_PORTAL_EL } from '../utils/config';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 64px;
  width: 100%;
  height: 100%;
  z-index: 100000;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const ModalFullScreen = ({ children }) => {
  return createPortal(
    <Overlay>
      <Content>{children}</Content>
    </Overlay>,
    MODAL_PORTAL_EL
  );
};
