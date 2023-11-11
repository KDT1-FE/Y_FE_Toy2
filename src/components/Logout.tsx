import { useContext } from "react";
import { AuthContext } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setAccessToken ,setRefreshToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = () => {
    setRefreshToken('');
    setAccessToken(null);
    sessionStorage.setItem('userId', '');
    navigate('/');  
  }

  return (
    <>
      <button onClick={handleClick}>로그아웃</button>
    </>
  )
}

export default Logout