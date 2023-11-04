export type { SaveScrollSchema } from './model/types/saveScrollSchema';
export {
  getSaveScrollCurrentScroll,
  getSaveScrollScrollByPath,
} from './model/selectors/getSaveScrollSelectors';
export { saveScrollActions, saveScrollReducer } from './model/slice/saveScrollSlice';
