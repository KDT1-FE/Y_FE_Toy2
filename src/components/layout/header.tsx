import styled from 'styled-components';
import { titleAction } from '../../util/util';
import { useNavigate } from 'react-router-dom';
import { ChatIcon, HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
  const navigate = useNavigate();

  const checkLocation = () => {
    titleAction(navigate);
  };
  return (
    <Container>
      <Title onClick={checkLocation}>FastMind</Title>
      <LogoContainer>
        <ChatContainer>
          <ChatIcon width="19px" height="19px" color="#2D3748"></ChatIcon>
        </ChatContainer>
        <MenuContainer>
          <HamburgerIcon
            width="24px"
            height="24px"
            color="#2D3748"></HamburgerIcon>
        </MenuContainer>
      </LogoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 1000px;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Title = styled.div`
  cursor: pointer;

  line-height: 28px;
  font-size: 32px;
  font-weight: 600;
`;

const LogoContainer = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const MenuContainer = styled(ChatContainer)`
  margin-left: 0.5rem;
`;

export default Header;
