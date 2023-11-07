import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        background-color: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
    }
`;
