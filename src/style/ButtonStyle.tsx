import styled from "styled-components";
import { theme } from "./theme";

interface ButtonStyleProps {
  backgroundColor: "red" | "white";
  size: "s" | "m" | "l";
  text: string;
}

const ButtonStyleComponents = styled.button<ButtonStyleProps>`
  width: ${(props) => {
    switch (props.size) {
      case "s":
        return "102px";
      case "m":
        return "190px";
      default:
        return "190px";
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "s":
        return "48px";
      case "m":
        return "60px";
      default:
        return "60px";
    }
  }};
  border: none;
  border-radius: ${(props) => {
    switch (props.size) {
      case "s":
        return "30px";
      case "m":
        return "40px";
      default:
        return "40px";
    }
  }};
  background-color: ${(props) =>
    props.backgroundColor === "red" ? theme.mainColor : "#FFF"};
  color: ${(props) => (props.backgroundColor === "red" ? "#fff" : "#383535")};
  font-size: ${(props) => {
    switch (props.size) {
      case "s":
        return "400";
      case "m":
        return "700";
      default:
        return "700";
    }
  }};
  font-weight: bold;

  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.backgroundColor === "red" ? "#fc2520" : "#F5F5F5"};
  }
`;

function ButtonStyle(props: ButtonStyleProps) {
  return <ButtonStyleComponents {...props}>{props.text}</ButtonStyleComponents>;
}

export default ButtonStyle;
