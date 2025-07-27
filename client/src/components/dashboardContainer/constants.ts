export const FILTER_TYPES = ["location", "time posted"] as const;
export type FilterTypes = typeof FILTER_TYPES[number];