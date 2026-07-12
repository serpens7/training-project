import { StoryFn, Meta } from '@storybook/react';

import { CommentList } from './CommentList';

export default {
    title: 'shared/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof CommentList>;

const Template: StoryFn<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
