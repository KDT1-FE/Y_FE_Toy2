'use client';

import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { ChatingModalToggle } from '@/store/atoms';

export default function ChatingModal() {
    const [modalToggle, setModalToggle] = useRecoilState<boolean>(ChatingModalToggle);

    return <>{modalToggle ? <ModalWrapper></ModalWrapper> : ''}</>;
}

const ModalMove = keyframes`
        0% {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
        }
        to {
            opacity: 1;
            transform: translateZ(0);
        }
`;

const ModalWrapper = styled.div`
    width: 70%;
    height: 100%;

    background-color: #fff;

    position: absolute;
    right: 0;

    z-index: 2;

    animation: ${ModalMove} 1s;
`;
