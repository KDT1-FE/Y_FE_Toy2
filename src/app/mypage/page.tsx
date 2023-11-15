'use client';

import React, { useEffect, useState } from 'react';
import ProfileEdit from '@/components/Mypage/ProfileEdit';
import Navigation from '@/components/Navigation';
import Profile from '@/components/Mypage/Profile';
import styled from 'styled-components';
import { getCookie } from '@/lib/cookie';

const page = () => {
  const [isRightWay, setIsRightWay] = useState<boolean>(false);

  useEffect(() => {
    const isUserAccess = getCookie('accessToken');

    if (isUserAccess) {
      setIsRightWay(true);
    } else {
      setIsRightWay(false);
    }
  }, []);

  if (!isRightWay) {
    return null;
  } else {
    return (
      <>
        <UsersWrap>
          <HeaderText>마이 페이지</HeaderText>
          <Profile />
          <ProfileEdit />
        </UsersWrap>
        <Navigation />
      </>
    );
  }
};

export default page;

const UsersWrap = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  padding: 3rem;

  @media screen and (max-width: 700px) {
    padding: 1.5rem;
    overflow-y: auto;
  }
`;

const HeaderText = styled.h1`
  color: ${({ theme }) => theme.color.mainGreen};
  font-size: ${({ theme }) => theme.fontSize.title};

  margin-top: 0;

  padding: 1rem;
`;
