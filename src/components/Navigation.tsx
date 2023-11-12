'use client';

import styled from 'styled-components';
// svg 가져오기
import usersSvg from '../../public/assets/naviUsers.svg';
import mychatsSvg from '../../public/assets/naviMychats.svg';
import allChatsSvg from '../../public/assets/naviAllchats.svg';
import mypageSvg from '../../public/assets/naviMypage.svg';
import usersActiveSvg from '../../public/assets/naviUsersActive.svg';
import mychatsActiveSvg from '../../public/assets/naviMychatsActive.svg';
import allChatsActiveSvg from '../../public/assets/naviAllchatsActive.svg';
import mypageActiveSvg from '../../public/assets/naviMypageActive.svg';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;

    const pathname = usePathname();
    const path = pathname.split('/')[1];

    console.log(path);

    return (
        <NavigationContainer>
            <NavigationBox>
                <NavigationAnchor href="users">
                    {path == 'users' ? <UsersActiveIcon /> : <UsersIcon />}
                </NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="mychats">
                    {path == 'mychats' ? <MyChatsActiveIcon /> : <MyChatsIcon />}
                </NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="allchats">
                    {path == 'allchats' ? <AllChatsActiveIcon /> : <AllChatsIcon />}
                </NavigationAnchor>
            </NavigationBox>
            <NavigationBox>
                <NavigationAnchor href="#">{path == 'mypage' ? <MyPageActiveIcon /> : <MyPageIcon />}</NavigationAnchor>
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

const UsersIcon = styled(usersSvg)`
    cursor: pointer;
`;

const UsersActiveIcon = styled(usersActiveSvg)`
    cursor: pointer;
`;

const MyChatsIcon = styled(mychatsSvg)`
    cursor: pointer;
`;

const MyChatsActiveIcon = styled(mychatsActiveSvg)`
    cursor: pointer;
`;

const AllChatsIcon = styled(allChatsSvg)`
    cursor: pointer;
`;

const AllChatsActiveIcon = styled(allChatsActiveSvg)`
    cursor: pointer;
`;

const MyPageIcon = styled(mypageSvg)`
    cursor: pointer;
`;

const MyPageActiveIcon = styled(mypageActiveSvg)`
    cursor: pointer;
`;
