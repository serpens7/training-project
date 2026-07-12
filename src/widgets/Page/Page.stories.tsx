import { StoryFn, Meta } from '@storybook/react';

import { Page } from './Page';

export default {
    title: 'shared/Page',
    component: Page,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Page>;

const Template: StoryFn<typeof Page> = (args) => <Page {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
