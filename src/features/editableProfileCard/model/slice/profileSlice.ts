import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '@/entities/Profile';
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema';

const initialState: ProfileSchema = {
    readonly: true,
    data: undefined,
    form: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        initEditForm: (state, action: PayloadAction<Profile | undefined>) => {
            state.data = action.payload;
            state.form = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        setValidateErrors: (state, action: PayloadAction<ValidateProfileError[] | undefined>) => {
            state.validateErrors = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
