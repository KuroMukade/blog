import { AppDispatch } from 'app/providers/StoreProvider';
// eslint-disable-next-line no-restricted-imports
import { useDispatch } from 'react-redux';

// eslint-disable-next-line no-restricted-syntax
export const useAppDispatch = () => useDispatch<AppDispatch>();
