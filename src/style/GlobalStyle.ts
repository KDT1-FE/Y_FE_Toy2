import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'Pretendard';
        src: url('../assets/fonts/PretendardVariable.woff2');
    }
    body {
        background-color: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
        font-family: 'Pretendard'
    }
`;
