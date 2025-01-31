import { styled } from "styled-components";

const HeaderStyled = styled.header`
  background-color: ${({ theme }) => theme.color.background};

  h1 {
    color: ${({ theme }) => theme.color.primary};
  }
`;

function Header() {
  return <HeaderStyled>book store</HeaderStyled>;
}

export default Header;
