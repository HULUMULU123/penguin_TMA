// @ts-nocheck
import styled from "styled-components";
import sampleImage from "../../assets/start_screen.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Создаем стилизованные компоненты
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: sans-serif;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${sampleImage});
  background-size: cover;
  background-position: center 30%;
  z-index: 0;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to bottom, transparent 20%, white 50%);
  z-index: 1;
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: white;
  z-index: 2;
`;

const Content = styled.div`
  position: absolute;
  bottom: 60px;
  width: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Unbounded", sans-serif;
  font-size: 18px;
  font-weight: 800;
  background: linear-gradient(to right, #ff007a, #b339f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: "Gilory", sans-serif;
  font-size: 16px;
  color: #333;
  text-align: center;
  margin: 12px 0 28px;
`;

const StartButton = styled.button`
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

  transition: background 0.3s ease;

  text-decoration: none;
`;

export default function StartScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const permission = localStorage.getItem("startPermission");
    if (permission) {
      navigate("/photos");
    }
  }, []);

  const handelClick = () => {
    localStorage.setItem("startPermission", "true");
    navigate("/photos");
  };
  return (
    <Container>
      <Background />
      <GradientOverlay />
      <VerticalLine />
      <Content>
        <Title>ПИНГВИН · FACE SWAP</Title>
        <Subtitle>
          ПОДЧЕРКНИТЕ СВОЮ КРАСОТУ
          <br />В ПАРУ КЛИКОВ
        </Subtitle>
        <StartButton onClick={handelClick}>НАЧАТЬ</StartButton>
      </Content>
    </Container>
  );
}
