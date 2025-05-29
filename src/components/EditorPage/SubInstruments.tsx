import React, { useState } from "react";
import {
  SubFiltersList,
  SubFilterItem,
  SubFilterImg,
  SubFilterSpan,
  SelectVariationWrapper,
  BottomWrapper,
  SubInstrumentImg,
} from "./PhotoEditor.styles";
import RangeSlider from "./RangeSlider";
export default function SubInstruments({ instrumentItems }) {
  const [activeItem, setActiveItem] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [sliderValue, setSliderValue] = useState(50); // начальное значение
  console.log(sliderValue);
  return (
    <BottomWrapper>
      <RangeSlider
        value={sliderValue}
        onChange={(value) => setSliderValue(value)}
      />
      <SubFiltersList>
        {instrumentItems.map((option) => (
          <SubFilterItem
            key={option.id}
            onClick={() => {
              setActiveItem(option.id);
              setSliderValue(50);
            }}
          >
            <SubInstrumentImg active={option.id === activeItem} />
            <SubFilterSpan>{option.name}</SubFilterSpan>
          </SubFilterItem>
        ))}
      </SubFiltersList>
    </BottomWrapper>
  );
}
