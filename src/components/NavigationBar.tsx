import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/sweetyLogo.svg"
import { ReactComponent as Icon } from "../assets/sweetyIcon.svg"
import { ReactComponent as HomeIcon } from "../assets/homeIcon.svg"
import { ReactComponent as CommunityIcon } from "../assets/communityIcon.svg"
import { ReactComponent as ChatIcon } from "../assets/chattingIcon.svg"
import { ReactComponent as MyPageIcon } from "../assets/mypageIcon.svg"
import { ReactComponent as SettingIcon } from "../assets/settingIcon.svg"
import { ReactComponent as ActivedHomeIcon } from "../assets/activedHomeIcon.svg"
import { ReactComponent as ActivedCommunityIcon } from "../assets/activedCommunityIcon.svg"
import { ReactComponent as ActivedChatIcon } from "../assets/activedChattingIcon.svg"
import { ReactComponent as ActivedMyPageIcon } from "../assets/activedMypageIcon.svg"
import { ReactComponent as ActivedSettingIcon } from "../assets/activedSettingIcon.svg"

export default function NavigationBar() {
  const navigate = useNavigate();
  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isCommunityClicked, setIsCommunityClicked] = useState(false);
  const [isChatClicked, setIsChatClicked] = useState(false);
  const [isMyPageClicked, setIsMyPageClicked] = useState(false);
  const [isSettingClicked, setIsSettingClicked] = useState(false);

  const handleCategoryButton = ( category: string ) => {
    if(category === 'home')
      navigate(`/`);
    if(category === 'community')
      navigate(`/community`);
    if(category === 'chat')
      navigate(`/chat`);
    if(category === 'mypage')
      navigate(`/mypage`);
  } 

  const handleLinkToHomePage= () => {
    setIsHomeClicked(true);
    setIsCommunityClicked(false);
    setIsChatClicked(false);
    setIsMyPageClicked(false);

    localStorage.setItem('isHomeClicked', 'true');
    localStorage.setItem('isCommunityClicked', 'false');
    localStorage.setItem('isChatClicked', 'false');
    localStorage.setItem('isMyPageClicked', 'false');

    handleCategoryButton('home');
  }
  const handleLinkToCommunityPage= () => {
    setIsCommunityClicked(true);
    setIsHomeClicked(false);
    setIsChatClicked(false);
    setIsMyPageClicked(false);

    localStorage.setItem('isCommunityClicked', 'true');
    localStorage.setItem('isHomeClicked', 'false');
    localStorage.setItem('isChatClicked', 'false');
    localStorage.setItem('isMyPageClicked', 'false');

    handleCategoryButton('community');
  }

  const handleLinkToChatPage= () => {
    setIsChatClicked(true);
    setIsHomeClicked(false);
    setIsCommunityClicked(false);
    setIsMyPageClicked(false);

    localStorage.setItem('isChatClicked', 'true');
    localStorage.setItem('isCommunityClicked', 'false');
    localStorage.setItem('isHomeClicked', 'false');
    localStorage.setItem('isMyPageClicked', 'false');

    handleCategoryButton('chat');
  }

  const handleLinkToMyPage= () => {
    setIsMyPageClicked(true);
    setIsHomeClicked(false);
    setIsCommunityClicked(false);
    setIsChatClicked(false);
   
    localStorage.setItem('isMyPageClicked', 'true');
    localStorage.setItem('isHomeClicked', 'false');
    localStorage.setItem('isCommunityClicked', 'false');
    localStorage.setItem('isChatClicked', 'false');
    
    handleCategoryButton('mypage');
    
  }

  const handleOpenSettingBox = () => {
    setIsSettingClicked(!isSettingClicked);
  }

  // 새로고침 시 현재 페이지 clicked state 저장
  useEffect(() => {
    const isHomeClicked = localStorage.getItem('isHomeClicked') === 'true';
    const isCommunityClicked = localStorage.getItem('isCommunityClicked') === 'true';
    const isChatClicked = localStorage.getItem('isChatClicked') === 'true';
    const isMyPageClicked = localStorage.getItem('isMyPageClicked') === 'true';
  
    setIsHomeClicked(isHomeClicked);
    setIsCommunityClicked(isCommunityClicked);
    setIsChatClicked(isChatClicked);
    setIsMyPageClicked(isMyPageClicked);
  }, []);
  

  return (
    <NavigationWrap>
      <TopDiv>
        <LogoWrap onClick={handleLinkToHomePage}>
          <Logo style={{fill: 'red'}}/>
        </LogoWrap>
        <IconWrap onClick={handleLinkToHomePage}>
          <Icon />
        </IconWrap>
        <CategoryWrap>
          <ClickedBox $isClicked={isHomeClicked}>
            <CategoryButton onClick={handleLinkToHomePage}>
              { 
                isHomeClicked ?
                  <ActivedHomeIcon/> : <HomeIcon/>
              } 
            <CategoryTitle $isClicked={isHomeClicked}>Home</CategoryTitle>
          </CategoryButton>
          </ClickedBox>
          <ClickedBox $isClicked={isCommunityClicked}>
            <CategoryButton onClick={handleLinkToCommunityPage}>
              { 
                isCommunityClicked ?
                  <ActivedCommunityIcon/> : <CommunityIcon/>
              } 
              <CategoryTitle $isClicked={isCommunityClicked}>Community</CategoryTitle>
            </CategoryButton>
          </ClickedBox>
          <ClickedBox $isClicked={isChatClicked}>
            <CategoryButton onClick={handleLinkToChatPage}>
              { 
                isChatClicked ?
                  <ActivedChatIcon/> : <ChatIcon/>
              } 
              <CategoryTitle $isClicked={isChatClicked}>Chat</CategoryTitle>
            </CategoryButton>
          </ClickedBox>
          <ClickedBox $isClicked={isMyPageClicked}>
            <CategoryButton onClick={handleLinkToMyPage}>
              { 
                isMyPageClicked ?
                  <ActivedMyPageIcon/> : <MyPageIcon/>
              } 
              <CategoryTitle $isClicked={isMyPageClicked}>MyPage</CategoryTitle>
            </CategoryButton>
          </ClickedBox>
        </CategoryWrap>
      </TopDiv>
      <BottomDiv>
        <SettingBox $isClicked={isSettingClicked}>
          <SettingMenu>로그아웃</SettingMenu>
          <Divider></Divider>
          <SettingMenu>다른 설정...</SettingMenu>
        </SettingBox>
        <ClickedBox $isClicked={isSettingClicked}>
          <SettingButton onClick={handleOpenSettingBox}>
            { 
              isSettingClicked ?
                <ActivedSettingIcon/> : <SettingIcon/>
            } 
            <CategoryTitle $isClicked={isSettingClicked}>Settings</CategoryTitle>
          </SettingButton>
        </ClickedBox>
      </BottomDiv>
    </NavigationWrap>
  )
}

const NavigationWrap = styled.div`
  border-right: 1px solid ${props => props.theme.color.borderGray};
  background: ${props => props.theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 100vh;

  ${props => props.theme.response.tablet} {
    width: 100px;
  }

  ${props => props.theme.response.mobile} {
    border-top: 1px solid ${props => props.theme.color.borderGray};
    border-right: none;
    width: 100%;
    height: auto; 
    position: absolute;
    bottom: 0;
  }
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${props => props.theme.response.tablet} {
    gap: 40px;
  }

  ${props => props.theme.response.mobile} {
    width: 100%;
    align-items: center;
  }
`;

const BottomDiv = styled.div`
  margin-bottom: 30px;
  position: relative;

  ${props => props.theme.response.mobile} {
    display: none;
  }
`;

const LogoWrap = styled.div`
  margin-top: 40px;

  &:hover {
    cursor: pointer;
  }

  ${props => props.theme.response.tablet} {
    display: none;
  }
`;

const IconWrap = styled.div`
  display: none;
  margin-top: 30px;

  &:hover {
    cursor: pointer;
  }

  ${props => props.theme.response.tablet} {
    display: flex;
    justify-content: center;
  }

  ${props => props.theme.response.mobile} {
    display: none;
  }
`;

const CategoryWrap = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${props => props.theme.response.mobile} {
    flex-direction: row;
    padding: 15px 0;
    flex: 1; 
  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 30px; 
  width: 100%;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }

  ${props => props.theme.response.tablet} {
    padding: 18px;
  }
`;

const CategoryTitle = styled.span<{ $isClicked: boolean }>`
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: ${(props) => (props.$isClicked ? props => props.theme.color.primary : props => props.theme.color.black)};

  ${props => props.theme.response.tablet} {
    display: none;
  }
`;

const SettingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 30px; 
  width: 100%;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }

  ${props => props.theme.response.tablet} {
    padding: 18px;
  }
`;

const ClickedBox = styled.div<{ $isClicked: boolean }>`
  border-radius: 20px;
  background-color: ${(props) => (props.$isClicked ? props => props.theme.color.lightGray : "transparent")};
`;

const SettingBox = styled.div<{ $isClicked: boolean }>`
  width: 100%;
  height: 112px;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${props => props.theme.color.lightGray};
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute; 
  bottom: 75px; 
  left: 0;
  display: ${(props) => (props.$isClicked ? "flex" : "none")};

  ${props => props.theme.response.tablet} {
    width: 170px;
  }
`;

const SettingMenu = styled.span`
  color: ${props => props.theme.color.black};
  text-align: center;
  font-size: ${props => props.theme.font.largeSize};
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;

const Divider = styled.div`
  border: 0.5px solid ${props => props.theme.color.borderGray};
`;