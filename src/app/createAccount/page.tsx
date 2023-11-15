'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCookie } from '@/lib/cookie';

// components
import RegisterForm from '@/components/Register/RegisterForm';

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
      <CreatreAccountContainer>
        <RegisterForm />
      </CreatreAccountContainer>
    );
  }
};

export default page;

const CreatreAccountContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
