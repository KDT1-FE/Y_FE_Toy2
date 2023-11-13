import UserProfile from '../../components/template/userProfile';
import OnlineUserList from '../../components/layout/onlineUserList';
import { useEffect } from 'react';

import { Button, Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import CheckGameRoom from '../../components/layout/checkGameRoom';
import { controlLobbyReload, controlBack } from '../../hooks/leaveHandle';
// import CreateGameRoom from '../../components/layout/createGameRoom';
import { postRefresh } from '../../api';
import { getCookie } from '../../util/util';

const GameLobby = () => {
  controlLobbyReload();
  controlBack();
  // useEffect(() => {
  //   const refreshToken = getCookie('refreshToken');
  //   console.log('리프레쉬토큰', refreshToken);

  //   const fetchRefresh = async () => {
  //     if (refreshToken) {
  //       try {
  //         const res = await postRefresh(refreshToken);
  //         console.log(res.data.accessToken);
  //       } catch (error) {
  //         console.error('Error in refreshing token:', error);
  //         // Handle error appropriately
  //       }
  //     }
  //   };

  //   fetchRefresh();
  // }, []); // Add dependencies if needed
  return (
    <>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection={'row'}
        width={1400}>
        <LeftComponent>
          <CheckGameRoom />
        </LeftComponent>
        <RightComponent>
          <OnlineUserList />
          <UserProfile></UserProfile>
        </RightComponent>
        {/* <CreateGameRoom></CreateGameRoom> */}
      </Flex>
    </>
  );
};

const LeftComponent = styled.div`
  width: 930px;
`;

const RightComponent = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

export default GameLobby;
