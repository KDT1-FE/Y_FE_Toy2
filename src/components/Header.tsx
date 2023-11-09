import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";

interface MenuListItem {
  key: number;
  to: string;
  text: string;
}

const Header = () => {
  const { isDarkMode, toggleMode } = useDarkMode();
  const handleToggle = () => {
    toggleMode();
    window.localStorage.setItem("isDarkMode", isDarkMode.toString());
  };

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
          <StyledLink to={"#"}>로그인</StyledLink> |{" "}
          <StyledLink to={"#"}>회원가입</StyledLink>
        </UserInfo>
        <ThemeToggle isDarkMode={isDarkMode}>
          <input
            type="checkbox"
            id="toggleBtn"
            onChange={handleToggle}
            checked={isDarkMode}
          />
          <label htmlFor="toggleBtn"></label>
        </ThemeToggle>{" "}
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
  gap: 2em;
  font-size: 0.9em;
`;
const ThemeToggle = styled.label<{ isDarkMode: boolean }>`
  display: inline-block;
  position: relative;
  width: 3.1rem;
  height: 1.8rem;
  background-color: #ccc;
  border-radius: 5em;
  cursor: pointer;

  input[type="checkbox"] {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0.1em;
    left: 0.1em;
    width: 1.8em;
    height: 1.8em;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.4);
    transition: transform 0.2s ease;
  }

  input[type="checkbox"]:checked + label {
    transform: translateX(1.4em);
    background-color: ${(props) =>
      props.isDarkMode === false ? "#ffffff" : "#3a3a3a"};
  }

  label::before {
    content: "🌞";
    font-size: 1.7em;
    position: absolute;
    top: 0.1em;
  }

  input[type="checkbox"]:checked + label::before {
    content: "🌛";
  }
`;
const UserInfo = styled.div``;
