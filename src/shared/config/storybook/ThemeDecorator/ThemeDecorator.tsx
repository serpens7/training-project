import { Theme } from '@/shared/const/theme';
import { Decorator } from '@storybook/react';

export const ThemeDecorator = (theme: Theme): Decorator => (StoryComponent) => (
    <div className={`app ${theme}`}>
        <StoryComponent />
    </div>
);
