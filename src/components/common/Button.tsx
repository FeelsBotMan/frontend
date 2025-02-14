import React from "react";
import { styled } from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
}

function Button({
  children,
  size,
  scheme,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <ButtonStyle
      size={size}
      $scheme={scheme}
      disabled={disabled}
      isLoading={isLoading}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
}

interface ButtonStyleProps {
  size: ButtonSize;
  $scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, $scheme }) => theme.buttonScheme[$scheme].color};
  background-color: ${({ theme, $scheme }) =>
    theme.buttonScheme[$scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "none" : "pointer")};
`;

export default Button;
