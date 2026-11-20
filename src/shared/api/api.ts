import axios from 'axios';
import { USER_COOKIE_STORAGE_KEY } from 'entities/User';
import { cookieStore } from 'shared/lib/store';

export const $api = axios.create({
  baseURL: __API__,
  headers: __NODEJS__ ? {
    Authorization: JSON.stringify(cookieStore.get(USER_COOKIE_STORAGE_KEY)) || '',
  } : undefined,
});

if (!__NODEJS__) {
  $api.interceptors.request.use((config) => {
    const user = cookieStore.get(USER_COOKIE_STORAGE_KEY);

    if (user && !config.headers.has('Authorization')) {
      config.headers.set('Authorization', JSON.stringify(user));
    }

    return config;
  });
}
