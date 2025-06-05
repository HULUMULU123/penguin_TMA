import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  SubFiltersList,
  SubFilterItem,
  SubFilterImg,
  SubFilterSpan,
  SelectVariationWrapper,
  BottomWrapper,
} from "./PhotoEditor.styles";
import SelectVariation from "./SelectVariation";
import { EFFECT_FUNCTIONS } from "../../utils/ailabApi";
import RangeSlider from "./RangeSlider";
import LipsColorSlider from "./LipsColorSlider";

const ITEMS_PER_LOAD = 6;

export default function SubFilters({
  filterItems,
  setActiveSave,
  imgSrc,
  activeFilter,
  setCurrentImgSrc,
}) {
  const [activeItem, setActiveItem] = useState(0);
  const [localActiveFilter, setLocalActiveFilter] = useState(0);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [rangeValue, setRangeValue] = useState(50);
  const [rgbaValue, setRgbaValue] = useState({ r: 255, g: 0, b: 0, a: 1 });
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);

  // Мемоизируем currentOption
  const currentOption = useMemo(
    () => filterItems.find((item) => item.id === activeItem),
    [filterItems, activeItem]
  );

  const shouldShowRangeSlider =
    currentOption?.numFilters === 0 && currentOption?.rangeType === true;

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + ITEMS_PER_LOAD, filterItems.length)
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef]);

  useEffect(() => {
    setLocalActiveFilter(0);
    setRangeValue(50);
    setRgbaValue({ r: 255, g: 0, b: 0, a: 1 });
  }, [activeItem]);

  const applyEffect = async () => {
    setLoading(true);
    try {
      let response;

      if (activeFilter === "lipcolor" && currentOption) {
        response = await EFFECT_FUNCTIONS[activeFilter](
          imgSrc,
          rgbaValue,
          currentOption
        );
      } else if (shouldShowRangeSlider && currentOption) {
        response = await EFFECT_FUNCTIONS[activeFilter](
          imgSrc,
          rangeValue / 100,
          currentOption
        );
      } else if (currentOption) {
        // Для вариаций с несколькими фильтрами используем localActiveFilter
        const optionToApply =
          currentOption.numFilters && currentOption.numFilters > 1
            ? { ...currentOption, selectedFilter: localActiveFilter }
            : currentOption;
        response = await EFFECT_FUNCTIONS[activeFilter](imgSrc, optionToApply);
      }

      const base64 =
        response?.result?.image ||
        response?.data?.image ||
        response?.result_image;
      console.log(response?.data);
      const newImg =
        response?.data?.images[0] ||
        response?.data?.image_url ||
        `data:image/png;base64,${base64}`;
      console.log(newImg, "newIMG");
      if (newImg) {
        // Обновляем изображение
        setActiveSave(true);
        setCurrentImgSrc(newImg);
      }
    } catch (error) {
      console.error("Ошибка при применении эффекта:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (option) => {
    setActiveItem(option.id);
    setLocalActiveFilter(0);
    setRangeValue(50);
    setRgbaValue({ r: 255, g: 0, b: 0, a: 1 });
    setActiveSave(true);
  };

  return (
    <BottomWrapper>
      {activeFilter === "lipcolor" ? (
        <LipsColorSlider value={rgbaValue} onChange={setRgbaValue} />
      ) : shouldShowRangeSlider ? (
        <RangeSlider value={rangeValue} onChange={setRangeValue} />
      ) : (
        currentOption?.numFilters > 1 && (
          <SelectVariationWrapper>
            <SelectVariation
              activeFilter={localActiveFilter}
              setActiveFilter={setLocalActiveFilter}
              filterLen={currentOption.numFilters}
            />
          </SelectVariationWrapper>
        )
      )}

      <button
        onClick={applyEffect}
        disabled={loading}
        style={{ margin: "10px 0" }}
      >
        {loading ? "Применение..." : "Применить"}
      </button>

      <SubFiltersList>
        {filterItems.slice(0, visibleCount).map((option) => (
          <SubFilterItem key={option.id} onClick={() => handleClick(option)}>
            <SubFilterImg active={option.id === activeItem} src={option.img} />
            <SubFilterSpan>{option.name}</SubFilterSpan>
          </SubFilterItem>
        ))}
        {visibleCount < filterItems.length && (
          <div ref={observerRef} style={{ height: 1 }} />
        )}
      </SubFiltersList>
    </BottomWrapper>
  );
}
