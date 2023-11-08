'use client';
import styled from 'styled-components';
import { ImBubble } from 'react-icons/im';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';

// types 폴더 나중에 만들어서 type 빼놓기
interface User {
    id: string;
    password: string;
    name: string;
    picture: string;
    chats: string[];
}

const UserProfileModal = ({ clickModal, user }: { clickModal: () => void; user: User }) => {
    const { id, name, picture } = user;
    return (
        <UserModalBox onClick={clickModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={clickModal}>
                    <MdClose size="40" className="closeIcon" />
                </CloseButton>
                <ModalMain>
                    <UserImg src={picture} />
                    <UserInfo>
                        <UserName>{name}</UserName>
                        {/* 접속 상태 추후 개발필요. 현재는 하드코딩 */}
                        <p>online</p>
                    </UserInfo>
                    {/* 임시로 chating으로 이동하도록 해둠 */}
                    <Link href="/chating" className="link">
                        <ToChating>
                            <ImBubble size="40" className="chatIcon" />
                            <ChatText>1:1 채팅하기</ChatText>
                        </ToChating>
                    </Link>
                </ModalMain>
            </ModalContent>
        </UserModalBox>
    );
};

export default UserProfileModal;

const UserModalBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.4);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;

    width: 700px;
    height: 500px;

    border-radius: 5%;

    margin: 0 2rem;

    display: flex;
    flex-direction: column;
`;

const CloseButton = styled.div`
    margin: 1.5rem 2.5rem 0 auto;

    cursor: pointer;

    .closeIcon {
        color: #9a9a9a;
    }

    &:hover .closeIcon {
        color: #00956e;
        transition: 0.4s;
    }
`;

const ModalMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    .link {
        text-decoration: none;
        color: black;
    }
`;

const UserImg = styled.img`
    width: 150px;
    height: 150px;

    border-radius: 70%;

    overflow: hidden;

    margin-top: 5px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;

    margin-left: 6rem;
`;

const UserName = styled.h1`
    font-size: 2.1rem;
`;

const ToChating = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    cursor: pointer;

    &:hover .chatIcon {
        color: #00956e;
        transition: 0.4s;
    }
`;

const ChatText = styled.p`
    font-weight: 500;
`;
