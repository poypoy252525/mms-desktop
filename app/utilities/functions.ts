export type FilterDateType = "TODAY" | "MONTH" | "WEEK" | "";

export const isFilterDateType = (value: string): boolean => {
  const statuses: FilterDateType[] = ["TODAY", "MONTH", "WEEK", ""];
  if (statuses.includes(value as FilterDateType) && value !== "") return true;
  return false;
};
