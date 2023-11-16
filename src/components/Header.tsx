import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import Logout from "./Logout";
import { ThemeContext } from "../App";
import { lightTheme } from "../style/theme";
import useApi from "../hooks/useApi";
import SunIcon from "../assets/images/sun.svg";
import MoonIcon from "../assets/images/moon.svg";

interface MenuListItem {
  key: number;
  to: string;
  text: string;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface ResponseValue {
  auth: boolean;
  user?: User;
}

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { accessToken } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { getData } = useApi();

  useEffect(() => {
    // 현재 로그인한 유저 정보 출력
    const checkCurrentUser = async () => {
      if (!accessToken) {
        console.log("No access token available.");
        return;
      }
      try {
        const response: ResponseValue = await getData(
          "https://fastcampus-chat.net/auth/me"
        );
        if (response.auth && response.user) {
          setCurrentUser(response.user);
          console.log("Current User:", response.user);
        } else {
          console.log("Authentication failed or no user data.");
        }
      } catch (error) {
        console.error("Error fetching current user information:", error);
      }
    };
    checkCurrentUser();
  }, [accessToken]);

  const menuList: MenuListItem[] = [
    {
      key: 1,
      to: "/profiles",
      text: "취미메이트 만나기"
    },
    {
      key: 2,
      to: "/chat",
      text: "채팅하기"
    }
  ];

  return (
    <NavBar>
      <SubMenu>
        <Logo>
          <StyledLink to={"/"}>CHWIMIMATE</StyledLink>
        </Logo>
        <Menu>
          {menuList.map((menu) => (
            <li key={menu.key}>
              <StyledLink to={menu.to}>{menu.text}</StyledLink>
            </li>
          ))}
        </Menu>
      </SubMenu>
      <UserBar>
        <UserInfo>
          {accessToken ? (
            <>
              <UserProfile>
                <UserImg src={currentUser?.picture} />{" "}
                <UserName to={""}>{currentUser?.name}</UserName>님
                <UserSubMenu>
                  <StyledSubLink to={`/profiles/${currentUser?.id}`}>
                    내 프로필 가기
                  </StyledSubLink>
                  <br />
                  <Logout />
                </UserSubMenu>
              </UserProfile>
            </>
          ) : (
            <UserProfile>
              <StyledLink to={"/login"}>로그인</StyledLink>{" "}
              <StyledLink to={"/signup"}>회원가입</StyledLink>
            </UserProfile>
          )}
        </UserInfo>
        <ToggleBtn onClick={toggleTheme}>
          {theme === lightTheme ? (
            <img src={SunIcon} alt="light mode" />
          ) : (
            <img src={MoonIcon} alt="dark mode" />
          )}
        </ToggleBtn>
      </UserBar>
    </NavBar>
  );
};

export default Header;

const NavBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
  padding: 1em 13em;
  border-bottom: 1px solid #e8e8e8;
`;
const SubMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2em;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  font-weight: 300;
`;
const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 2em;
  font-size: 0.9em;
  font-weight: 400;
  list-style-type: none;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 0 5px;
  &:hover {
    color: #f43630;
  }
  &:nth-child(2){
    position: relative;
    &:before{
      content: "";
      left: -4px;
      height: 0.8em;
      top: 50%;
      margin-top: -0.4em;
      position: absolute;
      border-left: 1px solid #b3b3b3;
    }
  }
`;
const StyledSubLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #f43630;
  }
`;
const UserBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  gap: 1em;
  font-size: 0.9em;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  gap: 2em;
`;
const ToggleBtn = styled.button`
  padding: 0;
  background-color: transparent;
  appearance: none;
  border: none;
  cursor: pointer;
  img {
    width: 1.5em;
    height: 1.5em;
    transition:
      transform 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
  }
  &:hover {
    img {
      transform: scale(1.3);
      opacity: 0.8;
    }
  }
`;
const UserSubMenu = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #f2f2f2;
  border-radius: 1em;
  width: 6.1em;
  height: 2.8em;
  top: 1.7em;
  left: 1.4em;
  padding: 1em 1em;
  justify-content: center;
  align-items: center;
  line-height: 1.4em;
  display: none;
  pointer-events: auto;
  z-index: 999;
  button {
    padding: 0;
    background-color: transparent;
    appearance: none;
    border: none;
    color: black;
    &:hover {
      color: #f43630;
    }
  }
`;
const UserProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  position: relative;
  &:hover {
    & ${UserSubMenu} {
      display: block;
    }
  }
`;
const UserImg = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 2em;
`;

const UserName = styled(Link)`
  font-size: 1.1em;
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #f43630;
  }
  margin-right: 0.4em;
`;
