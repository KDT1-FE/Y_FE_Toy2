'use client';

import styled from 'styled-components';
import Back from '../../../public/assets/back.svg';
import Menu from '../../../public/assets/menu.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ChatingModalToggle } from '@/store/atoms';

export default function ChatingNavigation() {
    const [modalToggle, setModalToggle] = useRecoilState<boolean>(ChatingModalToggle);

    const router = useRouter();

    return (
        <NavigationWrapper>
            <BackIcon onClick={() => router.back()} />
            <ChatTitle>9조 단톡방</ChatTitle>

            <MenuIcon
                onClick={() => {
                    setModalToggle(!modalToggle);
                    console.log(modalToggle);
                }}
            />
        </NavigationWrapper>
    );
}

const NavigationWrapper = styled.div`
    width: 100%;
    height: 83px;

    background-color: rgba(0, 0, 0, 0);

    position: absolute;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    z-index: 1;
`;

const ChatTitle = styled.div`
    font-size: 30px;
    font-weight: 700;
`;

const BackIcon = styled(Back)`
    cursor: pointer;
    margin-left: 10px;
`;

const MenuIcon = styled(Menu)`
    cursor: pointer;
    margin-right: 10px;
`;
