import styled from 'styled-components';
import menuImg from '../../assets/icons/menu.png';
import chatImg from '../../assets/icons/chat.png';
import { titleAction } from '../../util/util';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();

  const checkLocation = () => {
    titleAction(navigate);
  };
  return (
    <Container>
      <Title onClick={checkLocation}>FastMind</Title>
      <LogoContainer>
        <LogoImage src={chatImg} alt="chat" />
        <LogoImage src={menuImg} alt="menu" />
      </LogoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  flex-direction: row;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 5rem;

  line-height: 28px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
`;

const LogoImage = styled.img`
  width: 40px;
  height: auto;
  cursor: pointer;

  &:first-child {
    margin-right: 1rem;
  }
`;

export default Header;
