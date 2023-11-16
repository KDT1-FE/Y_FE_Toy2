import styled from "styled-components";
import { theme } from "./theme";

const InputStyle = styled.input`
  width: 461px;
  height: 50px;

  border: 1px solid #bfbfbf;
  border-radius: 10px;
  color: #999696;

  font-size: 16px;

  padding: 16px 0px 15px 29px;

  &:focus {
    border-color: ${theme.blueColor};
    outline: none;
  }
  box-sizing: border-box;
`;

export default InputStyle;
