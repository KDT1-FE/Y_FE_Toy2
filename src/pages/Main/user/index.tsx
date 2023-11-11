import { Button } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atoms/authState";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AdminMain = () => {
  console.log("AdminMain 렌더링"); // 컴포넌트 렌더링 확인
  const { isAuthenticated } = useRecoilValue(authState);
  console.log("Is Authenticated:", isAuthenticated);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  if (isAuthenticated) {
    return (
      <div>
        <div>성공!!!</div>
        <Button onClick={handleLogout}>로그아웃</Button>
      </div>
    );
  }

  return <div>admin main page</div>;
};

export default AdminMain;
