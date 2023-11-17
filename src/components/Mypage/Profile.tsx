'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { instance } from '@/lib/api';

import { useRecoilState, useRecoilValue } from 'recoil';
import { UserProfile, UserProfileModal } from '@/store/atoms';

import styled from 'styled-components';
import { deleteCookie } from '@/lib/cookie';

interface User {
  id: string;
  name: string;
  picture: string;
}

interface IUser {
  user: {
    name: string;
    picture: string;
  };
}

const Profile = () => {
  const [profile, setProfile] = useRecoilState<User>(UserProfile);
  const currentModalOpen = useRecoilValue(UserProfileModal);

  const uesrId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const router = useRouter();

  const getUser = async (): Promise<void> => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await instance.get<unknown, IUser>(`user?userId=${userId}`);
      if (res) {
        const { user } = res;

        setProfile({
          id: uesrId as string,
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
    localStorage.clear();
    deleteCookie();
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

  box-shadow: ${({ theme }) => theme.shadow.list};
  background-color: white;

  padding: 1rem 2rem;
  padding-bottom: 1.5rem;

  position: relative;

  @media screen and (max-width: 700px) {
    padding-bottom: 2.25rem;
  }

  button {
    all: unset;

    font-size: 0.8rem;

    position: absolute;
    bottom: 20px;
    right: 30px;

    font-weight: 600;
    color: ${({ theme }) => theme.color.mainGreen};

    cursor: pointer;
    &:hover {
      transition: 0.4s;
      color: ${({ theme }) => theme.color.darkGreen};
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

  @media screen and (max-width: 700px) {
    width: 100px;
    height: 100px;
  }
`;

const UserRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const UserName = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.title};

  @media screen and (max-width: 700px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
  @media screen and (max-width: 400px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
const UserId = styled.h2`
  margin-top: -11px;

  color: ${({ theme }) => theme.color.darkGray};
  font-size: ${({ theme }) => theme.fontSize.md};
  @media screen and (max-width: 400px) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;
