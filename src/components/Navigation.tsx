'use client';

import styled from 'styled-components';

export default function Navigation() {
    return (
        <NavigationContainer>
            <NavigationBox>
                <NavigationAnchor href="#">1</NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="#">2</NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="#">3</NavigationAnchor>
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

    background-color: #00956e;
    border-top: 1px solid black;
`;

const NavigationBox = styled.div`
    width: 25%;
    height: 100%;
`;

const NavigationAnchor = styled.a`
    color: white;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    &:hover {
        color: #efefef;
    }
`;
