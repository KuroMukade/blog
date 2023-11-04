import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from 'reselect';

export const getSaveScrollCurrentScroll = (state: StateSchema) => state.saveScroll.scroll;

export const getSaveScrollScrollByPath = createSelector(
  getSaveScrollCurrentScroll,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
