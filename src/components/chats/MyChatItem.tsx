'use client';
import React from 'react';
import styled from 'styled-components';
import { Chat } from '../../store/chatsStore';
import { formatCreatedAt } from '@/hooks/chatsList/useFormatCreatedAt';

const MyChatItem = ({ name, latestMessage, users, onClick }: Chat) => {
    const chatsPicture = users && users.length > 0 ? users[0].picture : '';
    const usersNumber = users && users.length > 0 ? users.length : '';
    const chatsName = users && users.length === 1 ? users[0].username : name;
    return (
        <Wrapper>
            <ChatBox onClick={onClick}>
                <ChatDescContainer>
                    <ChatInfo>
                        <ChatImage>
                            <img src={chatsPicture} alt="chats picutre" />
                        </ChatImage>
                        <ChatDesc>
                            <ChatPart>
                                <ChatName>
                                    {chatsName} <span>{usersNumber}</span>
                                </ChatName>
                            </ChatPart>
                            <LateMessage>{latestMessage ? latestMessage.text : ''} </LateMessage>
                        </ChatDesc>
                    </ChatInfo>
                    <MessageCount>
                        <ReceiveTime>{latestMessage ? formatCreatedAt(latestMessage.createdAt) : ''}</ReceiveTime>
                        <CountBox>+100</CountBox>
                    </MessageCount>
                </ChatDescContainer>
            </ChatBox>
        </Wrapper>
    );
};

export default MyChatItem;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ChatBox = styled.div`
    margin-top: 2rem;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    font-weight: bold;
    &:hover {
        background: #00956e;
        color: #ffffff;
        font-weight: bold;
    }
`;

const ChatDescContainer = styled.div`
    display: flex;
    gap: 0.2rem;
    justify-content: space-between;
`;

const ChatInfo = styled.div`
    display: flex;
`;
const ChatImage = styled.div`
    img {
        width: 3rem;
        height: 3rem;
        margin: 2rem 0.5rem 2rem 2rem;
        border-radius: 1rem;
    }
`;

const ChatDesc = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    padding: 0.5rem;
    margin-top: 0.5rem;
`;

const ChatPart = styled.div`
    display: flex;
`;

const ChatName = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    color: #000;
    padding: 0;
    margin: 0;

    span {
        font-size: 1.1rem;
        font-weight: bold;
        color: #626262;
    }
`;

const LateMessage = styled.p`
    font-size: 0.8rem;
    font-weight: bold;
    color: #626262;
    padding: 0;
    margin-top: 0.1rem;
`;

const MessageCount = styled(ChatDesc)`
    text-align: center;
    margin-bottom: 1.2rem;
    margin-right: 1.2rem;
`;

const ReceiveTime = styled.p`
    font-size: 0.8rem;
`;

const CountBox = styled.div`
    border-radius: 0.6rem;
    text-align: center;
    padding: 0.1rem 0.5rem;
    background-color: #00956e;
    color: #fff;
    /* &:hover {
        background-color: #fff;
        color: #000;
    } */
`;
