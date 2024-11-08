export type CookiesManagerType = {
    get(name: string): string;
    getAll(): {[key: string]: string};
}
