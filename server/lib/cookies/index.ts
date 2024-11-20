import { CookiesManagerType } from '@client/shared/contexts/cookies/types';

type ServerCookieType = { [key: string]: string; };

export class ServerCookiesManager implements CookiesManagerType {
  private cookies: ServerCookieType;

  constructor(cookies: ServerCookieType) {
    this.cookies = cookies;
  }

  get(name: string): string {
    return this.cookies[name];
  }

  getAll(): ServerCookieType {
    return this.cookies;
  }
}
