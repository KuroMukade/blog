import { ArticleView } from "entities/Article";

export const getIsViewValid = (view: unknown): view is ArticleView => {
  if (view === 'grid' || view === 'list') return true;
  return false;
}
