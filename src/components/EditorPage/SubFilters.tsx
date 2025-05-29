import React, { useEffect, useRef, useState } from "react";
import {
  SubFiltersList,
  SubFilterItem,
  SubFilterImg,
  SubFilterSpan,
  SelectVariationWrapper,
  BottomWrapper,
} from "./PhotoEditor.styles";
import SelectVariation from "./SelectVariation";

const ITEMS_PER_LOAD = 20;

export default function SubFilters({ filterItems, setActiveSave }) {
  const [activeItem, setActiveItem] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const observerRef = useRef(null);

  const filterLen = filterItems.find((item) => item.id === activeItem);
  const shouldShowSelectVariation = filterLen?.numFilters > 1;

  const loadMore = () => {
    console.log("Подгружаю еще...");
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
  }, [observerRef.current]);

  return (
    <BottomWrapper>
      {shouldShowSelectVariation && (
        <SelectVariationWrapper>
          <SelectVariation
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filterLen={filterLen?.numFilters}
          />
        </SelectVariationWrapper>
      )}

      <SubFiltersList>
        {filterItems.slice(0, visibleCount).map((option) => (
          <SubFilterItem
            key={option.id}
            onClick={() => {
              setActiveItem(option.id);
              setActiveSave(true);
            }}
          >
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
