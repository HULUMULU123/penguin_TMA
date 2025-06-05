import React, { useState } from "react";
import {
  SubFiltersList,
  SubFilterItem,
  SubFilterSpan,
  SelectVariationWrapper,
  BottomWrapper,
  SubInstrumentImg,
} from "./PhotoEditor.styles";
import RangeSlider from "./RangeSlider";
import SelectVariation from "./SelectVariation";
import { AgeSelector } from "./AgeSelector";
import { GenderSelector } from "./GenderSelector";

import { EFFECT_FUNCTIONS } from "../../utils/ailabApi";
import TopGarmentUploader from "./TopGarmentUploader";
import ProgressBar from "./ProgressBar";

export default function SubInstruments({
  instrumentItems,
  setActiveSave,
  imgSrc,
  activeInsrument,
  setCurrentImgSrc,
}) {
  const [activeItem, setActiveItem] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [sliderValue, setSliderValue] = useState(100);

  const [age, setAge] = useState(25);
  const [gender, setGender] = useState(0);

  const [topGarment, setTopGarment] = useState();

  const [loading, setLoading] = useState(false);

  const currentOption = instrumentItems.find((item) => item.id === activeItem);
  const isRangeSlider =
    currentOption?.numFilters === 0 && currentOption?.rangeType === true;

  // Функция для применения эффекта
  const applyEffect = async () => {
    setLoading(true);
    try {
      let response;

      if (activeInsrument === "age") {
        response = await EFFECT_FUNCTIONS[activeInsrument](
          imgSrc,
          age,
          currentOption
        );
      } else if (activeInsrument === "gender") {
        response = await EFFECT_FUNCTIONS[activeInsrument](
          imgSrc,
          gender,
          currentOption
        );
      } else if (activeInsrument === "tryon") {
        response = await EFFECT_FUNCTIONS[activeInsrument](
          imgSrc,
          topGarment,
          currentOption
        );
      } else if (isRangeSlider && currentOption) {
        response = await EFFECT_FUNCTIONS[activeInsrument](
          imgSrc,
          sliderValue / 100,
          currentOption
        );
      } else if (currentOption) {
        response = await EFFECT_FUNCTIONS[activeInsrument](
          imgSrc,
          currentOption
        );
      }

      const base64 = response?.result?.image;
      const newImg =
        response?.data?.image_url || `data:image/png;base64,${base64}`;
      console.log(newImg);
      if (newImg) setCurrentImgSrc(newImg);
    } catch (error) {
      console.error("Ошибка при применении эффекта:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomWrapper>
      {activeInsrument === "age" ? (
        <AgeSelector age={age} onChange={setAge} />
      ) : activeInsrument === "gender" ? (
        <GenderSelector gender={gender} onChange={setGender} />
      ) : activeInsrument === "tryon" ? (
        <TopGarmentUploader setTopGarment={setTopGarment} />
      ) : isRangeSlider ? (
        <RangeSlider
          value={sliderValue}
          onChange={(value) => setSliderValue(value)}
        />
      ) : (
        <SelectVariationWrapper>
          <SelectVariation
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filterLen={currentOption?.numFilters}
          />
        </SelectVariationWrapper>
      )}
      {loading ? <ProgressBar /> : null}
      <button onClick={applyEffect} disabled={loading}>
        {loading ? "Применение..." : "Применить"}
      </button>

      <SubFiltersList>
        {instrumentItems.map((option) => (
          <SubFilterItem
            key={option.id}
            onClick={() => {
              setActiveItem(option.id);
              setSliderValue(100);
              setActiveFilter(0);
              setActiveSave(true);
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
