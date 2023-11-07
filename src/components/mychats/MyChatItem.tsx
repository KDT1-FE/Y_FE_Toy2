'use client';
import React from 'react';
import styled from 'styled-components';

const MyChatItem = () => {
    return (
        <Wrapper>
            <h1>나의 채팅 아이템</h1>
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
