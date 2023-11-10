import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { titleAction } from '../../util/util';
import { useNavigate } from 'react-router-dom';
import { ChatIcon, HamburgerIcon } from '@chakra-ui/icons';
import LoginModal, { LoginModalRef } from './loginModal';
import ChattingModal, { ChattingModalRef } from './chattingModal';

interface ModalRef {
  contains(arg0: Node): unknown;
  current: HTMLDivElement | null;
  showModal?: () => void;
}

const StyledContainer = styled.div<{ $isClicked: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) =>
    props.$isClicked ? '#e2e8f0' : 'transparent'};

  &:hover {
    background-color: #e2e8f0;
  }
};
`;
const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isChatContainerClicked, setIsChatContainerClicked] = useState(false);
  const [isMenuContainerClicked, setIsMenuContainerClicked] = useState(false);

  const chatContainerRef = useRef<ModalRef>(null);
  const menuContainerRef = useRef<ModalRef>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatContainer = chatContainerRef.current?.current;
      const menuContainer = menuContainerRef.current?.current;

      if (chatContainer && !chatContainer.contains(event.target as Node)) {
        setIsChatContainerClicked(false);
      }

      if (menuContainer && !menuContainer.contains(event.target as Node)) {
        setIsMenuContainerClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const checkLocation = () => {
    titleAction(navigate);
  };

  const handleChatContainerClick = () => {
    setIsChatContainerClicked(true);
    setIsMenuContainerClicked(false);

    if (chatContainerRef.current) {
      if ('showModal' in chatContainerRef.current) {
        chatContainerRef.current.showModal?.();
      }
    }
  };

  const handleMenuContainerClick = () => {
    setIsChatContainerClicked(false);
    setIsMenuContainerClicked(true);

    if (menuContainerRef.current) {
      if ('showModal' in menuContainerRef.current) {
        menuContainerRef.current.showModal?.();
      }
    }
  };

  return (
    <HeaderContainer>
      <Title onClick={checkLocation}>FastMind</Title>
      <LogoContainer>
        <StyledContainer
          as="div"
          ref={chatContainerRef as unknown as React.RefObject<HTMLDivElement>}
          $isClicked={isChatContainerClicked}
          onClick={handleChatContainerClick}>
          <ChatIcon width="19px" height="19px" color="#2D3748"></ChatIcon>
        </StyledContainer>
        <StyledContainer
          as="div"
          ref={menuContainerRef as unknown as React.RefObject<HTMLDivElement>}
          $isClicked={isMenuContainerClicked}
          onClick={handleMenuContainerClick}>
          <HamburgerIcon
            width="24px"
            height="24px"
            color="#2D3748"></HamburgerIcon>
        </StyledContainer>
      </LogoContainer>
      {isChatContainerClicked && (
        <ChattingModal
          ref={chatContainerRef as unknown as React.RefObject<ChattingModalRef>}
        />
      )}
      {isMenuContainerClicked && (
        <LoginModal
          ref={menuContainerRef as unknown as React.RefObject<LoginModalRef>}
        />
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
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

export default Header;
