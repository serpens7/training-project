import { StateSchema } from "@/app/providers/StoreProvider";
import { DeepPartial } from '@reduxjs/toolkit';
import { ValidateProfileError } from "../types/editableProfileCardSchema";
import { getProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors } from "./getProfile";


describe('profile selectors', () => {
    test('getProfileIsLoading', () => {
        const state: DeepPartial<StateSchema> = {
            profile: { isLoading: true, readonly: false },
        };

        expect(getProfileIsLoading(state as StateSchema)).toBe(true);
    });

    test('getProfileError', () => {
        const state: DeepPartial<StateSchema> = {
            profile: { error: 'error', readonly: false, isLoading: false },
        };

        expect(getProfileError(state as StateSchema)).toBe('error');
    });

    test('getProfileData', () => {
        const data = { username: 'admin' };

        const state: DeepPartial<StateSchema> = {
            profile: { data, readonly: false, isLoading: false, error: 'error' },
        };

        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('getProfileReadonly', () => {
        const state: DeepPartial<StateSchema> = {
            profile: { readonly: true, isLoading: false, error: 'error' },
        };

        expect(getProfileReadonly(state as StateSchema)).toBe(true);
    });

    test('getProfileValidateErrors', () => {
        const errors = [ValidateProfileError.SERVER_ERROR, ValidateProfileError.INCORRECT_USER_DATA];

        const state: DeepPartial<StateSchema> = {
            profile: { validateErrors: errors, readonly: false, isLoading: false, error: 'error' },
        };

        expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
    });

    test('getProfileForm', () => {
        const form = { username: 'admin' };

        const state: DeepPartial<StateSchema> = {
            profile: { form, readonly: false, isLoading: false, error: 'error' },
        };

        expect(getProfileForm(state as StateSchema)).toEqual(form);
    });
});
