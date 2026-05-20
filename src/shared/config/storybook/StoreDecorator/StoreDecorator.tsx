import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Story } from '@storybook/react';
import { Action, DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from '@/features/AuthByUserName/model/slice/loginSlice';

const defaultAsyncReducers = {
    loginForm: loginReducer,
};

export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) => (StoryComponent: Story) => (
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
