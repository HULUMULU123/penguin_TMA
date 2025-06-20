// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";
import { Sheet } from "react-modal-sheet"; // Важно: импорт по умолчанию

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff6fd;
  min-height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 20px 17px;
  z-index: 0;
`;

const GridCell = styled.div`
  background-color: white;
  border-radius: 20px;
  aspect-ratio: 1 / 1;
  max-width: 113px;
  max-height: 113px;
`;

const GradientContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 246, 253, 0.1),
    rgba(255, 246, 253, 0.9)
  );
  z-index: 1;
`;

const TextContainer = styled.div`
  width: 80%;
  z-index: 2;
`;

const Title = styled.h1`
  font-family: "Unbounded", sans-serif;
  font-size: 18px;
  font-weight: 800;
  background: linear-gradient(to right, #ff007a, #b339f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: "Gilroy", sans-serif;
  font-size: 16px;
  color: #333;
  text-align: center;
  margin: 12px 0 28px;
  text-transform: uppercase;
  margin-top: 1rem;
`;

const Button = styled.button`
  font-family: "Unbounded", sans-serif;
  width: 90%;
  max-width: 340px;
  padding: 1.4rem 0;
  font-size: 16px;
  font-weight: bold;
  background-color: #c11fbe;
  color: white;
  border: none;
  border-radius: 30px;
  box-shadow: 0 6px 20px rgba(193, 31, 190, 0.4);
  text-align: center;
  position: absolute;
  bottom: 60px;
  z-index: 2;
`;

const ModalTitle = styled.h2`
  font-family: "Unbounded", sans-serif;
  font-size: 16px;
  color: #333;
  margin: 0 0 20px;
  text-align: center;
`;

const ModalButton = styled.button`
  font-family: "Unbounded", sans-serif;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const AllowButton = styled(ModalButton)`
  background-color: #c11fbe;
  color: white;
  padding: 13px 21px;
  font-size: 11.5px;
  font-weight: 500;
`;

const DenyButton = styled(ModalButton)`
  background-color: #ccc;
  color: #333;
  padding: 13px 30px;
  font-size: 11.5px;
  font-weight: 500;
`;

export default function PhotoSelection({ setHasPermission }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAllowAccess = () => {
    localStorage.setItem("photoPermission", "true");
    setHasPermission(true);
    setIsModalOpen(false);
  };

  const cells = Array.from({ length: 20 }, (_, index) => (
    <GridCell key={index} />
  ));

  return (
    <Container>
      <GridBackground>{cells}</GridBackground>
      <GradientContainer />
      <TextContainer>
        <Title>Упс, фото не видно</Title>
        <Subtitle>разрешите доступ к вашим фотографиям</Subtitle>
      </TextContainer>
      <Button onClick={() => setIsModalOpen(true)}>Открыть доступ</Button>

      <Sheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        snapPoints={[0.2]}
        initialSnap={0}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div style={{ padding: "0px", textAlign: "center" }}>
              <ModalTitle>Предоставить доступ к фотографиям?</ModalTitle>
              <div>
                <AllowButton onClick={handleAllowAccess}>Разрешить</AllowButton>
                <DenyButton onClick={() => setIsModalOpen(false)}>
                  Отмена
                </DenyButton>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </Container>
  );
}
