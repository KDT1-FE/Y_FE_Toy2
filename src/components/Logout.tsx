import { useContext } from "react";
import { AuthContext } from "../hooks/useAuth";

function Logout() {
  const { setRefreshToken } = useContext(AuthContext)

  const handleClick = () => {
    setRefreshToken('')
    location.reload();
  }

  return (
    <button onClick={handleClick}>로그아웃</button>
  )
}

export default Logout