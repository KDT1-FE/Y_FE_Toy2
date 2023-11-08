import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
// import OnlineUserList from '../../components/layout/onineUserList';
// import UserList from '../../components/layout/userList';
const GameLobby = () => {
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
      {/* <UserList></UserList> */}
      <br></br>
      {/* <OnlineUserList /> */}
      <br></br>
      <CreateGameRoom></CreateGameRoom>
      <br></br>
      <CheckGameRoom></CheckGameRoom>
    </>
  );
};

export default GameLobby;
