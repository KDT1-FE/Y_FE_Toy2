'use client';

import styled from 'styled-components';

export default function Navigation() {
    return (
        <NavigationContainer>
            <NavigationBox>
                <NavigationAnchor href="users">유저</NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="#">2</NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="allchats">모든</NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="#">4</NavigationAnchor>
            </NavigationBox>
        </NavigationContainer>
    );
}

const NavigationContainer = styled.div`
    width: 100%;
    height: 80px;

    position: absolute;
    bottom: 0;

    display: flex;

    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const NavigationBox = styled.div`
    width: 25%;
    height: 100%;
`;

const NavigationAnchor = styled.a`
    color: black;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    &:hover {
        color: #00956e;
    }
`;
