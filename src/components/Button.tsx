// src/components/Button.tsx
// @ts-nocheck
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  background-color: ${(props) =>
    props.variant === "secondary" ? "#888" : "#FF69B4"};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary" ? "#aaa" : "#ff4eb8"};
  }
`;

function Button(props: React.PropsWithChildren<ButtonProps>) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

export default Button;
