import { useEffect, useState } from 'react';
import UserProfile from '../../components/template/userProfile';
import OnlineUserList from '../../components/layout/onlineUserList';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../states/atom';
import { Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import CheckGameRoom from '../../components/layout/checkGameRoom';
import { controlLobbyReload, controlBack } from '../../hooks/leaveHandle';
import { getUserData } from '../../api/index';

const GameLobby = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const [imgsrc, setImgsrc] = useState('');
  controlLobbyReload();
  controlBack();
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await getUserData(accessToken, 'hojin');
        const user = res;
        console.log(user);
        setImgsrc(user.data[4].picture); // 이미지 소스 업데이트
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData(); // 함수 호출
  }, [accessToken]); // accessToken이 변경될 때마다 함수 호출

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
          <UserProfile userImg={imgsrc}></UserProfile>
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
