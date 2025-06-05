import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Контейнер прогресс-бара
const BarContainer = styled.div`
  width: 30%;
  max-width: 300px;
  height: 5px;
  background-color: rgba(108, 107, 107, 0.3); // тёмный полупрозрачный фон
  border-radius: 10px;
  overflow: hidden;
`;

// Заполняемая часть прогресс-бара
const Progress = styled.div`
  height: 100%;
  background-color: #fff;
  width: 0%;
  transition: width 1s ease-in-out;
  border-radius: 10px 0 0 10px;
`;

const ProgressBar: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = progressRef.current;
    if (!ref) return;

    // ⏱ Этапы с задержкой и визуальной "остановкой"
    const step1 = setTimeout(() => {
      ref.style.width = "30%";
    }, 10);

    const step2 = setTimeout(() => {
      ref.style.width = "50%";
    }, 1000);

    const step3 = setTimeout(() => {
      ref.style.width = "75%";
    }, 2000);

    // 🧹 Очистка
    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, []);

  return (
    <BarContainer>
      <Progress ref={progressRef} />
    </BarContainer>
  );
};

export default ProgressBar;
