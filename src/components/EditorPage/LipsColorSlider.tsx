import React, { useRef } from "react";
import "./LipsColorSlider.css"; // подключим CSS отдельно

type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type Props = {
  value: RGBA;
  onChange: (val: RGBA) => void;
};

const colorMap: Record<keyof RGBA, string> = {
  r: "#ff4d4d",
  g: "#4dff4d",
  b: "#4d4dff",
  a: "#999999",
};

const LipsColorSlider: React.FC<Props> = ({ value, onChange }) => {
  const createSlider = (key: keyof RGBA) => {
    const min = 0;
    const max = key === "a" ? 100 : 255;
    const step = key === "a" ? 1 : 1;
    const val = value[key];
    const percent = ((val - min) / (max - min)) * 100;
    const ref = useRef<HTMLInputElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedVal =
        key === "a" ? parseFloat(e.target.value) : parseInt(e.target.value);
      onChange({ ...value, [key]: updatedVal });
    };

    return (
      <div className="slider-wrapper" key={key}>
        <label className="slider-label">{key.toUpperCase()}</label>
        <div className="slider-indicator" style={{ left: `${percent}%` }}>
          {key === "a" ? val.toFixed(2) : val}
        </div>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={val}
          onChange={handleInput}
          className="slider-input"
          style={{
            background: `linear-gradient(to right, ${colorMap[key]} ${percent}%, rgba(255,255,255,0.2) ${percent}%)`,
          }}
        />
      </div>
    );
  };

  return (
    <div className="slider-container">
      {(["r", "g", "b", "a"] as const).map(createSlider)}
    </div>
  );
};

export default LipsColorSlider;
