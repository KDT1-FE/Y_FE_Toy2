'use client';

import styled from 'styled-components';
// svg 가져오기
import userSvg from '../../public/assets/user.svg';
import mychatSvg from '../../public/assets/mychats.svg';
import allChatSvg from '../../public/assets/allchats.svg';
import mypageSvg from '../../public/assets/mypage.svg';
export default function Navigation() {
    const userId = sessionStorage.getItem('userId');
    return (
        <NavigationContainer>
            <NavigationBox>
                <NavigationAnchor href="users">
                    <UserIcon />
                </NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href={`${userId}`}>
                    <MyChatIcon />
                </NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="allchats">
                    <AllChatsIcon />
                </NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="#">
                    <MyPageIcon />
                </NavigationAnchor>
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

const UserIcon = styled(userSvg)`
    cursor: pointer;
`;

const MyChatIcon = styled(mychatSvg)`
    cursor: pointer;
`;

const AllChatsIcon = styled(allChatSvg)`
    cursor: pointer;
`;

const MyPageIcon = styled(mypageSvg)`
    cursor: pointer;
`;
