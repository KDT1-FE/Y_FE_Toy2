'use client';

import React, { useEffect, useState } from 'react';
import ProfileEdit from '@/components/Mypage/ProfileEdit';
import Navigation from '@/components/Navigation';
import Profile from '@/components/Mypage/Profile';
import styled from 'styled-components';

const page = () => {
    const [isRightWay, setIsRightWay] = useState<boolean>(false);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');

        if (accessToken) {
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
`;

const HeaderText = styled.h1`
    color: #00956e;
    margin-top: 0;
    padding: 1rem;
    font-size: 1.5rem;
`;
