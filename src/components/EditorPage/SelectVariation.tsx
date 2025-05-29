import React from "react";
import { VariationItem, VariationList } from "./PhotoEditor.styles";

export default function SelectVariation({
  activeFilter,
  setActiveFilter,
  filterLen,
}) {
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
