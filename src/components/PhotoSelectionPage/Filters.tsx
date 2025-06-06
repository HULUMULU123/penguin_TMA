// @ts-nocheck
import React from "react";
import {
  Avatar,
  Container,
  Nickname,
  PostCount,
  UserInfo,
  Username,
  StyledHeader,
  FiltersWrapper,
  FilterButton,
  Grid,
  Image,
  BottomButton,
} from "../../components/PhotoSelectionPage/PhotoSelectionPage.styles";
export default function Filters({ activeFilter, setActiveFilter }) {
  // ФИЛЬТРЫ
  const filters = [
    { label: "ЛИЦА", value: "faces" },
    { label: "ИЗБРАННОЕ", value: "favorites" },
    { label: "СЕЛФИ", value: "selfie" },
    { label: "ВСЕ", value: "all" },
  ];

  return (
    <FiltersWrapper>
      {filters.map((f) => (
        <FilterButton
          key={f.value}
          active={f.value === activeFilter}
          onClick={() => setActiveFilter(f.value)}
        >
          {f.label}
        </FilterButton>
      ))}
    </FiltersWrapper>
  );
}
