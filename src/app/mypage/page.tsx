'use client';

import React from 'react';
import ProfileEdit from '@/components/Mypage/ProfileEdit';
import Navigation from '@/components/Navigation';
import Profile from '@/components/Mypage/Profile';
import styled from 'styled-components';

const page = () => {
    return (
        <UsersWrap>
            <HeaderText>마이 페이지</HeaderText>
            <Profile />
            <ProfileEdit />
            <Navigation />
        </UsersWrap>
    );
};

export default page;

const UsersWrap = styled.div`
    padding: 3rem;

    display: flex;
    flex-direction: column;

    height: 100vh;
`;

const HeaderText = styled.h1`
    color: #00956e;

    margin-top: 0;

    padding: 1rem;
`;
