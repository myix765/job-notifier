interface FilterBadgeProps {
  filter: string;
  type: "location" | "time posted"
}

const FilterBadge = ({ filter, type }: FilterBadgeProps) => {
  return (
    <span className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-2">
      {filter}
    </span>
  )
}

export default FilterBadge;