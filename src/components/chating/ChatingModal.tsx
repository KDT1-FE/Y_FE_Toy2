'use client';

import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { ChatingModalToggle } from '@/store/atoms';

export default function ChatingModal() {
    const [modalToggle, setModalToggle] = useRecoilState<boolean>(ChatingModalToggle);

    return (
        <>
            <ModalWrapper style={{ display: `${modalToggle ? 'block' : 'none'}` }}>
                <ModalTitle>대화상대</ModalTitle>
                <UsersWrapper>
                    <UserWrapper>
                        <UserImg src="https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro" />
                        <UserName>Test01</UserName>
                    </UserWrapper>

                    <UserWrapper>
                        <UserImg src="https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro" />
                        <UserName>Test02</UserName>
                    </UserWrapper>

                    <UserWrapper>
                        <UserImg src="https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro" />
                        <UserName>Test03</UserName>
                    </UserWrapper>
                    <UserWrapper>
                        <UserImg src="https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro" />
                        <UserName>Test04</UserName>
                    </UserWrapper>
                    <UserWrapper>
                        <UserImg src="https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro" />
                        <UserName>Test05</UserName>
                    </UserWrapper>
                </UsersWrapper>
                <ChatingLeave>채팅방 나가기</ChatingLeave>
            </ModalWrapper>

            <ModalBackground
                style={{ display: `${modalToggle ? 'block' : 'none'}` }}
                onClick={() => setModalToggle(!modalToggle)}
            ></ModalBackground>
        </>
    );
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

const ModalBackgroundFade = keyframes`
    0% {
            opacity: 0;

        }
        to {
            opacity: 1;

        }
`;

const ModalBackground = styled.div`
    width: 100%;
    height: 100vh;

    position: absolute;
    z-index: 2;

    background-color: rgba(0, 0, 0, 0.2);
    animation: ${ModalBackgroundFade} 0.5s;
`;

const ModalWrapper = styled.div`
    width: 70%;
    height: 100%;

    background-color: #fff;

    position: absolute;
    right: 0;

    z-index: 3;

    animation: ${ModalMove} 0.5s;
`;

const ModalTitle = styled.div`
    width: 100%;
    font-size: 24px;

    padding-left: 20px;
    padding-top: 20px;

    font-weight: 700;
`;

const UsersWrapper = styled.div`
    width: 100%;
    padding-left: 30px;
    padding-top: 30px;
`;

const UserWrapper = styled.div`
    width: 100%;

    display: flex;
    align-items: center;

    margin-bottom: 20px;
`;

const UserImg = styled.img`
    width: 50px;
    height: 50px;

    border-radius: 25px;
`;

const UserName = styled.div`
    font-size: 24px;
    margin-left: 10px;
`;

const ChatingLeave = styled.div`
    font-size: 30px;
    color: #950000;

    position: absolute;
    bottom: 0;

    left: 50%;
    transform: translate(-50%, -50%);

    cursor: pointer;
`;
