import { FC, ReactNode } from 'react';

export type MfLoaderProps<T extends FC> = {
    mf: any;
    name: string;
    component: T;
    componentProps: Parameters<T>[0];
    fallback: ReactNode;
};
