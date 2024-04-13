import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localstorage';
import { localStore } from 'shared/lib/store';

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    Authorization: JSON.stringify(localStore.get(USER_LOCALSTORAGE_KEY)) || '',
  },
});
