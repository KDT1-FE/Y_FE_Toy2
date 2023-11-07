'use client';
import React from 'react';
import styled from 'styled-components';

const SearchMyChat = () => {
    return (
        <Wrapper>
            <SearchItem type="text" placeholder="검색" />
        </Wrapper>
    );
};

export default SearchMyChat;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SearchItem = styled.input`
    border: 1px solid black;
    border-radius: 1rem;
    width: 80vw;
    padding: 0.5rem 0.5rem;
`;
