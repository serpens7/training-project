import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Story } from '@storybook/react';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator =
    (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => (
        <StoreProvider initialState={state}>
            <StoryComponent />
        </StoreProvider>
    );
