// import {  } from '../../pages/login/userLogin';

// const OnlineUserList = async () => {
//   const socket = sendingClient;
//   if (socket) {
//     socket.on('message-to-client', (messageObject: any) => {
//       console.log(messageObject.data);
//     });
//   } else {
//     console.error(
//       'Socket is null. Socket connection might not be established yet.',
//     );
//   }
//   // const [allOnlineUsers, setAllOnlineUsers] = useRecoilState(onlineUserState);
//   // const token: any = localStorage.getItem('jwt');

//   // useEffect(() => {
//   //   const socket = socketLogin(token);

//   //   const handleUsersUpdate = (responseData: any) => {
//   //     const usersArray = Array.isArray(responseData) ? responseData : [];
//   //     setAllOnlineUsers(usersArray);
//   //   };

//   //   socket.on('users-server-to-client', handleUsersUpdate);

//   //   return () => {
//   //     socket.off('users-server-to-client', handleUsersUpdate);
//   //   };
//   // }, [setAllOnlineUsers, token]);

//   // console.log(allOnlineUsers);

//   return (
//     <>
//       <div>1</div>
//     </>
//   );
// };

// export default OnlineUserList;
