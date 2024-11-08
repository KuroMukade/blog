import axios from 'axios';
import { USER_COOKIE_STORAGE_KEY } from 'entities/User';
import { cookieStore } from 'shared/lib/store';

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    Authorization: JSON.stringify(cookieStore.get(USER_COOKIE_STORAGE_KEY)) || '',
  },
});
