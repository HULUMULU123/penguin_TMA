import React, { useEffect, useRef } from "react";
import "./AgeGenderSelector.css";

type AgeSelectorProps = {
  age: number;
  onChange: (age: number) => void;
};

export const AgeSelector: React.FC<AgeSelectorProps> = ({ age, onChange }) => {
  const rangeRef = useRef<HTMLInputElement>(null);
  const min = 1;
  const max = 85;

  const percent = ((age - min) / (max - min)) * 100;

  useEffect(() => {
    if (rangeRef.current) {
      rangeRef.current.style.setProperty("--percent", `${percent}%`);
    }
  }, [percent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className="slider-container">
      <label className="age-label">Возраст: {age}</label>
      {/* <div className="value-indicator" style={{ left: `${percent}%` }}>
        {age}
      </div> */}
      <input
        ref={rangeRef}
        type="range"
        min={min}
        max={max}
        step={1}
        value={age}
        onChange={handleChange}
        className="styled-range"
      />
    </div>
  );
};
