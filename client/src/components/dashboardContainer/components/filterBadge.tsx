import type { FilterTypes } from "@/components/dashboardContainer/constants";

interface FilterBadgeProps {
  filter: { type: FilterTypes; value: string };
}

const FilterBadge = ({ filter }: FilterBadgeProps) => {
  return (
    <span className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-2">
      {filter.value}
    </span>
  )
}

export default FilterBadge;