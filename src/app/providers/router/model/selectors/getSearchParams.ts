import type { StateSchema } from 'app/providers/StoreProvider';

export const getSearchParams = (state: StateSchema) => state.routerInfo.searchParams;
