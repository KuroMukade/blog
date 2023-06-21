import { Country, Currency } from 'shared/constants/common';

export interface Profile {
    name: string;
    lastname: string;
    age: string;
    country: Country;
    currency: Currency;
    city: string;
    username: string;
    avatar: string;
}

export interface ProfileSchema {
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly: boolean;
}
