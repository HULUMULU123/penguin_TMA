import React from "react";
import styled, { keyframes } from "styled-components";
import penguin from "../../assets/penguin.svg";

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  background-color: #fff6fd;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const RotatingSvg = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate} 2s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
`;

const CenterIcon = styled.img`
  width: 70px;
  height: 70px;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SvgRing = () => (
  <svg width="120" height="120" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff007a" />
        <stop offset="100%" stopColor="#b339f9" />
      </linearGradient>
    </defs>

    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#fbe7fa"
      strokeWidth="10"
      fill="none"
    />

    <path
      d="M 10 50 A 40 40 0 0 1 90 50"
      stroke="url(#gradient)"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const HalfCircleLoader = () => {
  return (
    <Wrapper>
      <SpinnerWrapper>
        <CenterIcon src={penguin} alt="icon" />
        <RotatingSvg>
          <SvgRing />
        </RotatingSvg>
      </SpinnerWrapper>
    </Wrapper>
  );
};

export default HalfCircleLoader;
