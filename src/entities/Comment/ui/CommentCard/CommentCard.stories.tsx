import { StoryFn, Meta } from '@storybook/react';

import { CommentCard } from './CommentCard';

export default {
    title: 'shared/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
