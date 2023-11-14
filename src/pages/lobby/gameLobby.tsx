import UserProfile from '../../components/template/userProfile';
import OnlineUserList from '../../components/layout/onlineUserList';

import { Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import CheckGameRoom from '../../components/layout/checkGameRoom';
import { controlLobbyReload, controlBack } from '../../hooks/leaveHandle';
import CreateGameRoom from '../../components/layout/createGameRoom';

const GameLobby = () => {
  controlLobbyReload();
  controlBack();

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
