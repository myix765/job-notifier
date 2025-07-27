import type { FilterTypes } from "../constants";

interface FilterBadgeProps {
  filter: { type: string; value: string };
  type: FilterTypes;
}

const FilterBadge = ({ filter }: FilterBadgeProps) => {
  return (
    <span className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-2">
      {filter.value}
    </span>
  )
}

export default FilterBadge;