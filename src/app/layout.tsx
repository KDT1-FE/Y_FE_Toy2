'use client';

import styled from 'styled-components';
import StyledComponentsRegistry from '../lib/registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <StyledComponentsRegistry>
                <Body>
                    <Container>{children}</Container>
                </Body>
            </StyledComponentsRegistry>
        </html>
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

    margin: 0 auto;
    position: relative;

    background-color: #fff;
`;
