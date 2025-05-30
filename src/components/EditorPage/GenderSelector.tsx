import React from "react";
import "./AgeGenderSelector.css";

type GenderSelectorProps = {
  gender: 0 | 1;
  onChange: (gender: 0 | 1) => void;
};

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  gender,
  onChange,
}) => {
  return (
    <div className="gender-selector-container">
      <div className="gender-selector">
        <span className="gender-label">Пол:</span>
        <label className="gender-option">
          <input
            type="radio"
            name="gender"
            checked={gender === 0}
            onChange={() => onChange(0)}
          />
          Мужской
        </label>
        <label className="gender-option">
          <input
            type="radio"
            name="gender"
            checked={gender === 1}
            onChange={() => onChange(1)}
          />
          Женский
        </label>
      </div>
    </div>
  );
};
