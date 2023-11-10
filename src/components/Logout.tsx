import { useContext } from "react";
import { AuthContext } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Logout({logout, setLogout}: {logout: boolean, setLogout:React.Dispatch<React.SetStateAction<boolean>>}) {
  const { setAccessToken ,setRefreshToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = () => {
    setRefreshToken('');
    setAccessToken(null);
    setLogout(true);
    navigate('/');  
  }

  return (
    <>
      <button onClick={handleClick}>로그아웃</button>
    </>
  )
}

export default Logout