import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 20px;
  position: relative;
`;

const ValueIndicator = styled.div`
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.4);
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 800;
  font-weight: bold;
`;

const StyledRange = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    margin-top: -6px;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    height: 16px;
    width: 16px;
    background: white;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }
`;

type RangeSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
};

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(value);
  const rangeRef = useRef<HTMLInputElement>(null);

  const updateBackground = (val: number) => {
    const percent = ((val - min) / (max - min)) * 100;
    if (rangeRef.current) {
      rangeRef.current.style.background = `linear-gradient(to right, #fff ${percent}%, rgba(255, 255, 255, 0.3) ${percent}%)`;
    }
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    updateBackground(currentValue);
  }, [currentValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  return (
    <SliderContainer>
      <ValueIndicator>
        {currentValue > 0 ? `+ ${currentValue}` : currentValue}
      </ValueIndicator>
      <StyledRange
        ref={rangeRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleInput}
      />
    </SliderContainer>
  );
};

export default RangeSlider;
