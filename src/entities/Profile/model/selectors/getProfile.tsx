import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileIsLoading = (state: StateSchema) =>
    state.profile?.isLoading;

export const getProfileError = (state: StateSchema) => state.profile?.error;

export const getProfileData = (state: StateSchema) => state.profile?.data;
export const getProfileReadonly = (state: StateSchema) =>
    state.profile?.readonly;

export const getProfileValidateErrors = (state: StateSchema) =>
    state.profile?.validateErrors;

export const getProfileForm = (state: StateSchema) => state.profile?.form;
