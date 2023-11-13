'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { instance } from '@/lib/api';

import { useRecoilState, useRecoilValue } from 'recoil';
import { UserProfile, UserProfileModal } from '@/store/atoms';

import styled from 'styled-components';

interface User {
    id: string;
    name: string;
    picture: string;
}

const Profile = () => {
    const [profile, setProfile] = useRecoilState<User>(UserProfile);
    const currentModalOpen = useRecoilValue(UserProfileModal);

    const router = useRouter();

    const getUser = async (): Promise<void> => {
        try {
            const userId = sessionStorage.getItem('userId');
            const res = await instance.get<User[]>(`user?userId=${userId}`);
            if (res) {
                const { user }: any = res;

                setProfile({
                    id: user.id,
                    name: user.name,
                    picture: user.picture,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getUser();
    }, [currentModalOpen]);

    const onLogout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('expiresAt');

        router.push('/login');
    };

    return (
        <>
            <User>
                <UserImg src={profile.picture} alt="user-profile-img" />
                <UserRight>
                    <UserName>{profile.name}</UserName>
                    <UserId>#{profile.id}</UserId>
                </UserRight>
                <button onClick={onLogout}>로그아웃</button>
            </User>
        </>
    );
};

export default Profile;

const User = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2.5rem;
    margin-bottom: 2rem;
    border-radius: 20px;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);
    background-color: white;
    padding: 1rem 2rem;
    padding-bottom: 1.5rem;
    position: relative;

    button {
        all: unset;
        font-size: 0.8rem;
        position: absolute;
        bottom: 15px;
        right: 25px;
        font-weight: 600;
        color: #00956e;
        cursor: pointer;
        &: hover {
            transition: 0.4s;
            color: #05664c;
        }
    }
`;

const UserImg = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 70%;
    overflow: hidden;
    margin-top: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

const UserRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const UserName = styled.h2`
    font-size: 1.9rem;
`;
const UserId = styled.h2`
    margin-top: -11px;
    color: #9a9a9a;
    font-size: 1.1rem;
`;
