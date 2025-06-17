// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import {
  SelectVariationWrapper,
  VariationItem,
  VariationList,
} from "./PhotoEditor.styles";

interface SelectVariationRangeProps {
  setValue: (value: number) => void;
  steps?: number; // добавляем steps как проп
}

export default function SelectVariationRange({
  setValue,
  value,
  steps = 5, // по умолчанию 5 частей
}: SelectVariationRangeProps) {
  const [activeVariation, setActiveVariation] = useState(value);

  // Генерация массива значений от 100 / steps до 100
  const values = useMemo(() => {
    const stepValue = 100 / steps;
    return Array.from({ length: steps }, (_, i) =>
      Math.round(stepValue * (i + 1))
    );
  }, [steps]);

  return (
    <SelectVariationWrapper>
      <VariationList>
        {values.map((val, id) => (
          <VariationItem
            active={activeVariation === id}
            key={id}
            onClick={() => {
              console.log(val);
              setActiveVariation(id);
              setValue(val);
            }}
          >
            {id + 1}
          </VariationItem>
        ))}
      </VariationList>
    </SelectVariationWrapper>
  );
}
