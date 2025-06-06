// src/components/FilterSelector.tsx
// @ts-nocheck
import styled from "styled-components";

const FilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
`;

const FilterItem = styled.div`
  flex: 1 1 30%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

interface Filter {
  id: string;
  name: string;
}

interface FilterSelectorProps {
  filters: Filter[];
  onSelect: (filterId: string) => void;
}

function FilterSelector(props: FilterSelectorProps) {
  return (
    <FilterList>
      {props.filters.map(function (filter) {
        return (
          <FilterItem
            key={filter.id}
            onClick={function () {
              props.onSelect(filter.id);
            }}
          >
            {filter.name}
          </FilterItem>
        );
      })}
    </FilterList>
  );
}

export default FilterSelector;
