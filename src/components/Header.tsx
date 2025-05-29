// src/components/Header.tsx
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <HeaderContainer>
      <button onClick={onBack}>Назад</button>
      <h2>{title}</h2>
      <button>...</button>
    </HeaderContainer>
  );
}

export default Header;
