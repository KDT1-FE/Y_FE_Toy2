'use client';

import styled from 'styled-components';
import StyledComponentsRegistry from '../lib/registry';
import { RecoilRoot } from 'recoil';
import { useState, useEffect } from 'react';
import { authCheck } from '@/hooks/Auth';
import { usePathname, useRouter } from 'next/navigation';

import Move from '@/components/Move';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const [shouldRenderMoveComponent, setShouldRenderMoveComponent] = useState<boolean>(false);

    authCheck(setShouldRenderMoveComponent, router, pathname);

    return (
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
