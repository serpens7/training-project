import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Story } from '@storybook/react';
import { Action, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from '@/features/AuthByUserName';
import { profileReducer } from '@/entities/Profile';
import { articleDetailsReducer } from '@/entities/Article';
import { addCommentFormReducer } from '@/features/AddCommentForm';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage';

const defaultAsyncReducers = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
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
