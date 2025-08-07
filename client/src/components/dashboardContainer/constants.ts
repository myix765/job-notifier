export const FILTER_TYPES = ["", "location", "keyword"] as const;
export type FilterTypes = typeof FILTER_TYPES[number];