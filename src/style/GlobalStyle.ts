import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'PretendardVariable';
        src: url("../assets/fonts/PretendardVariable.woff2") format('woff2-variations');
    }
    :root {
        font-family: 'Pretendard'
    }
    body {
        background-color: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
    }


`;
