'use client';

import styled from 'styled-components';
import StyledComponentsRegistry from '../lib/registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <StyledComponentsRegistry>
                <Body>{children}</Body>
            </StyledComponentsRegistry>
        </html>
    );
}

const Body = styled.body`
    margin: 0;
    * {
        box-sizing: border-box;
    }
`;
