import { StateSchema } from 'app/providers/StoreProvider';

export const getIsLoggedIn = (state: StateSchema) => Boolean(state.user.authData);
