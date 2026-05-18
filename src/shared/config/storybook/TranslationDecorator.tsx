import { I18nextProvider } from 'react-i18next';
import { Story } from '@storybook/react';
import { Suspense } from 'react';
import i18n from '@/shared/config/i18n/i18nForTests';

export const TranslationDecorator = (StoryComponent: Story) => (
    <I18nextProvider i18n={i18n}>
        <Suspense fallback='Loading translations...'>
            <StoryComponent />
        </Suspense>
    </I18nextProvider>
);
