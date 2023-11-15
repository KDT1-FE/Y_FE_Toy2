import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import UserConfigModal from "../../../components/Main/UserConfigModal";
import { useAuth } from "../../../hooks/useAuth";
import { authState } from "../../../recoil/atoms/authState";
import { userState } from "../../../recoil/atoms/userState";

const AdminMain = () => {
  console.log("AdminMain 렌더링"); // 컴포넌트 렌더링 확인
  const { isAuthenticated } = useRecoilValue(authState); // Recoil의 authState를 통해 인증 여부 확인
  console.log("Is Authenticated:", isAuthenticated);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const user = useRecoilValue(userState); // Recoil의 userState를 통해 사용자 정보 확인
  const [isUserConfigModalOpen, setIsUserConfigModalOpen] = useState(false);

  const toggleUserConfigModal = () => {
    setIsUserConfigModalOpen(!isUserConfigModalOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  console.log("User ID:", user.id);
  if (isAuthenticated) {
    return (
      <div>
        <div>사용자 ID: {user.id}</div>
        <Button onClick={handleLogout}>로그아웃</Button>
        <Button type="button" onClick={toggleUserConfigModal}>
          사용자 정보수정
        </Button>
        {isUserConfigModalOpen && (
          <UserConfigModal
            isOpen={isUserConfigModalOpen}
            onClose={toggleUserConfigModal}
          />
        )}
        {/* <UserConfigModal /> */}
      </div>
    );
  }
};

export default AdminMain;
