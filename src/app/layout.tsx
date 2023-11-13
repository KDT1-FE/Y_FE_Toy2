'use client';

import styled from 'styled-components';
import StyledComponentsRegistry from '../lib/registry';
import { RecoilRoot } from 'recoil';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { authCheck } from '@/hooks/Auth';
import { usePathname, useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Move from '@/components/Move';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    const router = useRouter();
    const pathname = usePathname();

    const [shouldRenderMoveComponent, setShouldRenderMoveComponent] = useState<boolean>(false);

    authCheck(setShouldRenderMoveComponent, router, pathname);

    /** 접속 유저 검색 */
    const accessToken = sessionStorage.getItem('accessToken');

    const socket = io(`https://fastcampus-chat.net/server`, {
        extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
            serverId: `${process.env.NEXT_PUBLIC_SERVER_KEY}`,
        },
    });

    useEffect(() => {
        socket.emit('users-server');
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <html lang="en">
                    <StyledComponentsRegistry>
                        <Body>
                            <Container>
                                {shouldRenderMoveComponent && <Move />}
                                {children}
                            </Container>
                        </Body>
                    </StyledComponentsRegistry>
                </html>
            </RecoilRoot>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

const Body = styled.body`
    margin: 0;
    width: 100vw;
    height: 100vh;
    background-color: #efefef;
    * {
        box-sizing: border-box;
    }
`;

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    height: 100%;
    overflow: hidden;

    margin: 0 auto;
    position: relative;

    background-color: #fff;
`;
