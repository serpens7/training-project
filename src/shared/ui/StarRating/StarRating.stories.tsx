import { Meta, StoryFn } from '@storybook/react';

import { StarRating } from './StarRating';

export default {
    title: 'shared/StarRating',
    component: StarRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof StarRating>;

const Template: StoryFn<typeof StarRating> = (args) => <StarRating {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Selected = Template.bind({});
Selected.args = {
    selectedStars: 3,
};

export const Large = Template.bind({});
Large.args = {
    size: 50,
};
