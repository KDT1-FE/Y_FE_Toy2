import React, { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Input,
  Button,
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { accessTokenState } from '../../states/atom';
import { postLogin } from '../../api/index';
import { loginSocket } from '../../api/socket';

function UserLogin() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useSetRecoilState(accessTokenState);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await postLogin(id, password);
      const { accessToken, refreshToken } = res.data;
      setAccessToken(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      alert('로그인에 성공했습니다.');
      console.log(loginSocket(accessToken));

      // const socket = io(`${SERVER_URL}/server`, {
      //   extraHeaders: {
      //     Authorization: `Bearer ${accessToken}`,
      //     serverId: SERVER_ID,
      //   },
      // });
      // socket.on('connect', () => {
      //   socket.emit('users-server');
      // });
      // socket.on('users-server-to-client', (data) => {
      //   setOnlineUsers(data);
      // });
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
      <Center flexDirection={'column'} alignItems={'center'} marginTop={10}>
        <form onSubmit={handleLoginSubmit}>
          <FormControl width={250} margin={'auto'}>
            <FormLabel>아이디</FormLabel>
            <Input
              marginBottom={5}
              placeholder="아이디를 입력해주세요"
              autoComplete="on"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </FormControl>
          <FormControl width={250} margin={'auto'}>
            <FormLabel>비밀번호</FormLabel>
            <Input
              marginBottom={10}
              placeholder="비밀번호를 입력해주세요"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
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
        </form>
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
