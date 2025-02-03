import { createGlobalStyle } from "styled-components";
import "sanitize.css";
import { ThemeName } from "./theme";

interface Props {
  themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
  body {
    padding: 0;
    margin: 0;
    background-color: ${({ theme }) => theme.color.background};
  }
  
  h1 {
    margin: 0;
  }
  
  * {
    color: ${(props) => (props.themeName == "light" ? "black" : "white")};
  }
  
`;