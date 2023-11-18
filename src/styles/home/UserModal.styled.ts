import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 15%;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

export default Backdrop;
