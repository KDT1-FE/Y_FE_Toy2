import { getAllUsers } from '../../api/index';
const GameLobby = () => {
  const handleGetAllUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt');
    if (!token) {
      alert('인증 토큰이 없습니다. 로그인이 필요합니다.');
      return;
    }

    try {
      // 닉네임 중복 핸들링 로직 필요
      const res = await getAllUsers(token);
      console.log(res.data);
      alert('성공');
    } catch (e: any) {
      console.error('에러:', e.response || e);
      alert('에러 발생');
    }
  };

  return (
    <>
      <button onClick={handleGetAllUsers}>getAllUsers</button>
    </>
  );
};

export default GameLobby;
