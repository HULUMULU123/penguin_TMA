// @ts-nocheck
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
// import RangeSlider from "./RangeSlider";
// import LipsColorSlider from "./LipsColorSlider";
import ProgressBar from "./ProgressBar";
import SelectVariationRange from "./SetVariationRange";

const ITEMS_PER_LOAD = 6;

export default function SubFilters({
  filterItems,
  setActiveSave,
  imgSrc,
  activeFilter,
  setCurrentImgSrc,
  setActiveHairStyle,
  activeHairStyle,
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
    setRangeValue(0);
    setRgbaValue({ r: 255, g: 0, b: 0, a: 1 });
  }, [activeItem]);

  useEffect(() => {
    if ((filterItems.length > 0 && activeItem !== 0) || rangeValue !== 0) {
      applyEffect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem, rangeValue]);

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
      } else if (activeFilter === "enhance" && currentOption) {
        response = await EFFECT_FUNCTIONS[activeFilter](imgSrc);
      } else if (shouldShowRangeSlider && currentOption) {
        response = await EFFECT_FUNCTIONS[activeFilter](
          imgSrc,
          rangeValue / 100,
          currentOption
        );
      } else if (currentOption) {
        if (activeFilter === "hairstyle" && !activeHairStyle)
          setActiveHairStyle(localActiveFilter);
        // Для вариаций с несколькими фильтрами используем localActiveFilter
        if (activeFilter === "hairstyle" && activeHairStyle) {
          response = await EFFECT_FUNCTIONS[activeFilter](
            imgSrc,
            activeHairStyle,
            currentOption?.haircolor
          );
        } else if (activeFilter === "hairstyle" && !activeHairStyle) {
          response = await EFFECT_FUNCTIONS[activeFilter](
            imgSrc,
            currentOption?.hairstyle
          );
        } else {
          const optionToApply =
            currentOption.numFilters && currentOption.numFilters > 1
              ? { ...currentOption, selectedFilter: localActiveFilter }
              : currentOption;
          response = await EFFECT_FUNCTIONS[activeFilter](
            imgSrc,
            optionToApply
          );
        }
      }
      console.log("Response full:", response);
      console.log("Response data:", response?.data);
      const base64 =
        response?.result?.image ||
        response?.data?.image ||
        response?.result_image;
      let newImg;
      if (base64) {
        newImg = `data:image/png;base64,${base64}`;
      } else {
        newImg =
          Array.isArray(response?.data?.images) &&
          response.data.images.length > 0
            ? response.data.images[0]
            : response?.data?.image_url;
      }

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
    setRangeValue(0);
    if (option.rgba) {
      setRgbaValue(option.rgba); // если есть rgba, устанавливаем его
    } else {
      setRgbaValue({ r: 255, g: 0, b: 0, a: 1 }); // сброс к дефолту
    }
    setActiveSave(true);
  };

  const visibleItems = filterItems.slice(0, visibleCount);

  return (
    <BottomWrapper>
      {/* {activeFilter === "lipcolor" ? (
        <LipsColorSlider value={rgbaValue} onChange={setRgbaValue} />) :  */}
      {shouldShowRangeSlider && currentOption?.name !== "enhance" ? (
        // <RangeSlider value={rangeValue} onChange={setRangeValue} />
        <SelectVariationRange setValue={setRangeValue} />
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
      {loading ? (
        <ProgressBar
          isVariation={
            shouldShowRangeSlider && currentOption?.name !== "enhance"
          }
        />
      ) : null}
      {/* <button
        onClick={applyEffect}
        disabled={loading}
        style={{ margin: "10px 0" }}
      >
        {loading ? "Применение..." : "Применить"}
      </button> */}

      <SubFiltersList>
        {visibleItems.length > 1 &&
          visibleItems.map((option) => (
            <SubFilterItem key={option.id} onClick={() => handleClick(option)}>
              <SubFilterImg
                active={option.id === activeItem}
                src={option.img}
              />
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
