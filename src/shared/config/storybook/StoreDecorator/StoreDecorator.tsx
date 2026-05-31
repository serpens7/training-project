import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Story } from '@storybook/react';
import { Action, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from '@/features/AuthByUserName/model/slice/loginSlice';
import { profileReducer } from '@/entities/Profile/model/slice/profileSlice';
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';

const defaultAsyncReducers = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
};

export const StoreDecorator =
    (
        state: DeepPartial<StateSchema>,
        asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
    ) =>
        (StoryComponent: Story) => (
            <StoreProvider
                initialState={state}
                asyncReducers={
                     { ...defaultAsyncReducers, ...asyncReducers } as DeepPartial<
                    ReducersMapObject<StateSchema, Action<any>>
                >
                }
            >
                <StoryComponent />
            </StoreProvider>
        );
