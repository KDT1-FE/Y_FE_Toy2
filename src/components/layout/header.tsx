import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>FastMind</Title>
      <LogoContainer>
        {/* <ChattingLogo />
        <MenuLogo /> */}
      </LogoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  flex-direction: row;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 5rem;
  flex: 1;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default Header;
