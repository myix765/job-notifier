interface FilterBadgeProps {
  filter: string;
}

const FilterBadge = ({ filter }: FilterBadgeProps) => {
  return (
    <span className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-2">
      {filter}
    </span>
  )
}

export default FilterBadge;