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
    width: 80vw;
    height: 3rem;
    border: none;
    padding: 0.5rem 0.7rem;
    background: #fffefe;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
`;
