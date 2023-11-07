// 'use client';
import React from 'react';
import styled from 'styled-components';

const MyChatItem = () => {
    return (
        <Wrapper>
            <ChatBox>하이</ChatBox>
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
    height: 4.5rem;
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
