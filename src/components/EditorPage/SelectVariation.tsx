import React from "react";
import { VariationItem, VariationList } from "./PhotoEditor.styles";

interface SelectVariationProps {
  activeFilter: number;
  setActiveFilter: (value: number) => void;
  filterLen: number;
}

export default function SelectVariation({
  activeFilter,
  setActiveFilter,
  filterLen,
}: SelectVariationProps) {
  return (
    <VariationList>
      {Array.from({ length: filterLen }, (_, id) => (
        <VariationItem
          active={activeFilter === id}
          key={id}
          onClick={() => setActiveFilter(id)}
        >
          {id + 1}
        </VariationItem>
      ))}
    </VariationList>
  );
}
