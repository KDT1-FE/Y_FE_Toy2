import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atoms/authState";

const AdminMain = () => {
  console.log("AdminMain 렌더링"); // 컴포넌트 렌더링 확인
  const { isAuthenticated } = useRecoilValue(authState);
  console.log("Is Authenticated:", isAuthenticated);

  if (isAuthenticated) {
    return <div>성공!!!</div>;
  }

  return <div>admin main page</div>;
};

export default AdminMain;
