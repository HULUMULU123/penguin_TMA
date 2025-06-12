import { useState } from "react";
import {
  SelectVariationWrapper,
  VariationItem,
  VariationList,
} from "./PhotoEditor.styles";

interface SelectVariationRangeProps {
  setValue: (value: number) => void;
}
export default function SelectVariationRange({
  setValue,
}: SelectVariationRangeProps) {
  const [activeVariation, setActiveVariation] = useState(0);
  const values = [20, 40, 60, 80, 100];
  return (
    // <VariationList>
    //   {Array.from({ length: filterLen }, (_, id) => (
    //     <VariationItem
    //       active={activeFilter === id}
    //       key={id}
    //       onClick={() => setActiveFilter(id)}
    //     >
    //       {id + 1}
    //     </VariationItem>
    //   ))}
    // </VariationList>
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
            {id}
          </VariationItem>
        ))}
      </VariationList>
    </SelectVariationWrapper>
  );
}
