import { Decorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator: Decorator = (StoryComponent) => (
    <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
        <StoryComponent />
    </BrowserRouter>
);
