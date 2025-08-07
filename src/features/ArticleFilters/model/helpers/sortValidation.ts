import { SortOrderType } from "shared/types";
import { ASCENDING_URL_VALUE, DESCENDING_URL_VALUE } from "../constants/sort";

export const isSortOrderValid = (sortValue: unknown): sortValue is SortOrderType => {
  if (sortValue === ASCENDING_URL_VALUE || sortValue === DESCENDING_URL_VALUE) return true;
  return false;
};
