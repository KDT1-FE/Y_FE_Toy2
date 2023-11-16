import { useContext } from "react";
import { AuthContext } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Logout() {
  const { setAccessToken, setRefreshToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    const ok = confirm("정말 로그아웃 하시겠습니까?");
    if (ok) {
      setRefreshToken("");
      setAccessToken(null);
      sessionStorage.setItem("userId", "");
      navigate("/");
    }
  };

  return (
    <>
      <LogoutBtn onClick={handleClick}>로그아웃</LogoutBtn>
    </>
  );
}

export default Logout;

const LogoutBtn = styled.span`
  padding: 0;
  background-color: transparent;
  appearance: none;
  border: none;
  color: black;
  cursor: pointer;
  &:hover {
    color: #f43630;
  }
`;
