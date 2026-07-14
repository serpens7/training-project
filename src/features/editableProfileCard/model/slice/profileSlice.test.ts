import { Country } from '@/entities/Country/@x/Profile';
import { Currency } from '@/entities/Currency/@x/Profile';
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema';
import { profileActions, profileReducer } from './profileSlice';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
};

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true),
        )).toEqual({ readonly: true });
    });

    test('test init edit form', () => {
        const state: DeepPartial<ProfileSchema> = {};

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.initEditForm(data),
        )).toEqual({
            data,
            form: data,
        });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit(),
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({
                username: '123456',
            }),
        )).toEqual({
            form: { username: '123456' },
        });
    });

    test('test set validate errors', () => {
        const state: DeepPartial<ProfileSchema> = {};

        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setValidateErrors([ValidateProfileError.SERVER_ERROR]),
        )).toEqual({
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        });
    });
});
