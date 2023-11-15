'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCookie } from '@/lib/cookie';

// components
import LoginForm from '@/components/Login/LoginForm';

const page = () => {
  const [isRightWay, setIsRightWay] = useState<boolean>(false);

  useEffect(() => {
    const isUserAccess = getCookie('accessToken');

    if (isUserAccess) {
      setIsRightWay(false);
    } else {
      setIsRightWay(true);
    }
  }, []);

  if (!isRightWay) {
    return null;
  } else {
    return (
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
    );
  }
};

export default page;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
