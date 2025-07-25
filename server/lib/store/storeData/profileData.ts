import { StateSchema } from "@client/app/providers/StoreProvider";
import { profileActions, fetchProfileData } from "@client/entities/Profile";
import { QueryParams } from "@client/shared/lib/url";
import { Store } from "@reduxjs/toolkit";

export const initializeProfileData = async (store: Store<StateSchema>, id: string) => {
    await store.dispatch(fetchProfileData(id));
}