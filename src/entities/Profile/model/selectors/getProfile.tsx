import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileIsLoading = (state: StateSchema) =>
    state.profile?.isLoading;

export const getProfileError = (state: StateSchema) => state.profile?.error;

export const getProfileData = (state: StateSchema) => state.profile?.data;
