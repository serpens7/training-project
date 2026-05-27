import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile, ValidateProfileError } from '../types/profile';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getProfileForm } from '../selectors/getProfile';
import { validateProfileData } from './validateProfileData';


export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        const formData = getProfileForm(getState() as any);

        const errors = validateProfileData(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<Profile>('/profile', formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
