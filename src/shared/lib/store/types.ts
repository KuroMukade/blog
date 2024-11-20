export interface Store<StoreType> {
    get<T extends keyof StoreType>(key: T): null | StoreType[T];
    set<T extends keyof StoreType>(key: T, value: any): void;
    remove<T extends keyof StoreType>(key: T): void;
    clearAll(): void;
}
