import { useState } from 'react';

import CreateGameRoom from '../../components/layout/createGameRoom';
import CheckGameRoom from '../../components/layout/checkGameRoom';
import { Button } from '@chakra-ui/react';

import { accessTokenState } from '../../states/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import OfflineUserList from '../../components/layout/offlineUserList';
import OnlineUserList from '../../components/layout/onlineUserList';
import UserList from '../../components/template/userList';
import UserLogout from '../login/userLogout';
import CheckPrivateChat from '../../components/layout/checkPrivateChat';
import MyUserData from '../../components/layout/MyUserData';

const GameLobby = () => {
  const setAccessToken = useSetRecoilState(accessTokenState); // hook 규칙으로 함수 외부에있어야함
  const accessToken = useRecoilValue(accessTokenState);

  return (
    <>
      <h2 style={{ fontWeight: 'bold' }}>1:1대화</h2>
      <CheckPrivateChat></CheckPrivateChat>
      <MyUserData></MyUserData>
      <br></br>
      <OnlineUserList />
      <br></br>
      <OfflineUserList />
      <br />
      <CreateGameRoom></CreateGameRoom>
      <br></br>
      <CheckGameRoom></CheckGameRoom>
      <br></br>
      <UserLogout />
    </>
  );
};

export default GameLobby;
