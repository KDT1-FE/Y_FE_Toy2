'use client';

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

interface Message {
    id: string;
    text: string;
    userId: string;
    createdAt: string; // Date?
}

export default function Messages(props: any) {
    return (
        <MessagesContainer>
            {props.messages
                ? props.messages.map((message: Message) => (
                      <MessageWrapper>
                          <MessageName>{message.userId}</MessageName>
                          <MessageText>{message.text}</MessageText>
                          <MessageTime>{message.createdAt}</MessageTime>
                      </MessageWrapper>
                  ))
                : ''}
        </MessagesContainer>
    );
}

const MessagesContainer = styled.div`
    width: 100%;
    height: 100vh;

    padding-bottom: 83px;
    background-color: #eee;

    display: flex;
    flex-direction: column-reverse;

    overflow: scroll;
`;

const MessageWrapper = styled.div`
    width: 100%;
`;

const MessageName = styled.div`
    font-size: 16px;
    color: #000;
`;

const MessageText = styled.div`
    width: 65%;

    margin-left: 60px;

    border-radius: 15px;
    border: 1px solid black;
`;

const MessagePicture = styled.img`
    width: 48px;
    height: 48px;
`;

const MessageTime = styled.div`
    color: #888;
`;
