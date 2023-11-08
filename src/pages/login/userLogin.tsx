import React, { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Center,
  Flex,
  Img,
  FormControl,
  FormLabel,
  Link,
  Box,
  Input,
  Button,
} from '@chakra-ui/react';

import { postLogin } from '../../api/index';
import { io } from 'socket.io-client';
import { SERVER_ID, SERVER_URL } from '../../constant';
import { useRecoilState } from 'recoil';
import { onlineUserState } from '../../states/atom';

function UserLogin() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [onlineUsers, setOnlineUsers] = useRecoilState(onlineUserState);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await postLogin(id, password);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      const token: any = localStorage.getItem('accessToken');
      const socket = io(`${SERVER_URL}/server`, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
          serverId: SERVER_ID,
        },
      });
      socket.on('connect', () => {
        socket.emit('users-server');
      });
      socket.on('users-server-to-client', (data) => {
        setOnlineUsers(data);
      });

      socket.on('message-to-client', (messageObject) => {
        console.log(messageObject);
      });
      navigate('/lobby');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Center flexDirection={'column'}>
        <Box>
          <Img height={'250px'} marginBottom={'10px'} alt="mainImg" />
        </Box>
        <Box flexDirection={'column'} textAlign={'center'} margin={'auto'}>
          <form onSubmit={handleLoginSubmit}>
            <FormControl
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}>
              <Box>
                <FormLabel width={250} marginTop={10}>
                  아이디
                </FormLabel>
                <Input
                  marginBottom={5}
                  placeholder="아이디를 입력해주세요"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel width={250}>비밀번호</FormLabel>
                <Input
                  marginBottom={10}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Button
                width={350}
                marginBottom={20}
                height={50}
                type="submit"
                colorScheme="teal"
                size="lg"
                isDisabled={!id || !password}>
                로그인
              </Button>
            </FormControl>
          </form>
        </Box>

        <Flex justifyContent={'center'} gap="10px" padding="10">
          <Link as={ReactRouterLink} to="join" marginRight={2}>
            회원가입
          </Link>
          <Link as={ReactRouterLink} to="account" marginLeft={2}>
            아이디/PW찾기
          </Link>
        </Flex>
      </Center>
    </div>
  );
}

export default UserLogin;
