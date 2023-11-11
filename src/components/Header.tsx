import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../hooks/useAuth";
import Logout from "./Logout";
import { ThemeContext } from "../App";
import { lightTheme } from "../style/theme";

interface MenuListItem {
  key: number;
  to: string;
  text: string;
}

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { accessToken } = useContext(AuthContext);

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
          <StyledLink to={""}>CHWIMIMATE</StyledLink>
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
            <Logout></Logout>
          ) : (
            <>
              <StyledLink to={"login"}>로그인</StyledLink> |{" "}
              <StyledLink to={"signup"}>회원가입</StyledLink>
            </>
          )}
        </UserInfo>
        <ToggleBtn onClick={toggleTheme}>
          {theme === lightTheme ? (
            <img src="/src/assets/images/sun.svg" alt="light mode" />
          ) : (
            <img src="/src/assets/images/moon.svg" alt="dark mode" />
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
  &:hover {
    color: #f43630;
  }
`;
const UserBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  font-size: 0.9em;
`;
const UserInfo = styled.div``;
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
