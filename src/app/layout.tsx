'use client';

import styled from 'styled-components';
import StyledComponentsRegistry from '../lib/registry';
import { RecoilRoot } from 'recoil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import Move from '@/components/Move';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const [shouldRenderMoveComponent, setShouldRenderMoveComponent] = useState<boolean>(false);

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');

        if (token) {
            if (pathname === '/login' || pathname === '/createAccount') {
                setShouldRenderMoveComponent(true);
                setTimeout(() => {
                    setShouldRenderMoveComponent(false);
                    router.push('/');
                }, 1500);
            }
        } else {
            if (pathname !== '/login' && pathname !== '/createAccount') {
                setShouldRenderMoveComponent(true);
                setTimeout(() => {
                    setShouldRenderMoveComponent(false);
                    router.push('/login');
                }, 1500);
            }
        }
    }, []);

    return (
        <RecoilRoot>
            <html lang="en">
                <StyledComponentsRegistry>
                    <Body>
                        <Container>
                            <div>{shouldRenderMoveComponent && <Move />}</div>
                            {children}
                        </Container>
                    </Body>
                </StyledComponentsRegistry>
            </html>
        </RecoilRoot>
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
