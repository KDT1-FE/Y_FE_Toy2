import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface MenuListItem {
  key: number;
  to: string;
  text: string;
}

const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleMode = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const menuList: MenuListItem[] = [
    {
      key: 1,
      to: "/profile",
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
          <StyledLink to={""}>NOLTO</StyledLink>
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
        <DarkThemeBtn onClick={toggleMode}>
          {!isDarkTheme ? "🌞" : "🌛"}
        </DarkThemeBtn>
        <UserInfo>유저 닉네임 | 로그아웃</UserInfo>
      </UserBar>
    </NavBar>
  );
};

export default Header;

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em 3em;
  color: #4d4d4d;
`;
const SubMenu = styled.div`
  display: flex;
  flex-direction: row;
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
`;
const UserBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2em;
  font-size: 0.9em;
`;
const DarkThemeBtn = styled.button`
  width: 3.5em;
  height: 1.5em;
  border: none;
  font-size: 1.5em;
  border-radius: 3em;
`;
const UserInfo = styled.div``;
