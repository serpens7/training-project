import { Theme } from '@/app/providers/ThemeProvider';
import { Story } from '@storybook/react';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    <div className={`app ${theme}`}>
        <StoryComponent />
    </div>
);
