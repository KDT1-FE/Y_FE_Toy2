import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
import OnlineUserList from '../../components/layout/onlineUserList';
import UserList from '../../components/layout/userList';
import OfflineUserList from '../../components/layout/offlineUserList';
import { getAllUsers } from '../../api';

const GameLobby = () => {
  const handleGetAllUsers = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
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

  // const [allUsers, setAllUsers] = useRecoilState(allUserState);
  // const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  // const token: any = localStorage.getItem('jwt');

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const allUsersData = await getAllUsers(token);
  //       setAllUsers(allUsersData);
  //       const allRoomsData = await getAllGameRooms(token);
  //       setAllRooms(allRoomsData.chats);
  //     } catch (error) {
  //       console.error('데이터 가져오기 오류:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  return (
    <>
      <UserList></UserList>
      <br></br>
      <OnlineUserList />
      <br></br>
      <OfflineUserList />
      <br />
      <CreateGameRoom></CreateGameRoom>
      <br></br>
      <CheckGameRoom></CheckGameRoom>
    </>
  );
};

export default GameLobby;
