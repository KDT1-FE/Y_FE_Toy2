import { useState } from 'react';
import { getUsers } from '../../api/index';
import { accessTokenState } from '../../states/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import OnlineUserList from '../../components/layout/onlineUserList';
import MyUserData from '../../components/layout/MyUserData';
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Input,
  Button,
  Img,
  Switch,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Fade,
} from '@chakra-ui/react';
import styled from 'styled-components';
import CheckGameRoom from '../../components/layout/checkGameRoom';

const GameLobby = () => {
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
          <MyUserData />
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
`;

export default GameLobby;
