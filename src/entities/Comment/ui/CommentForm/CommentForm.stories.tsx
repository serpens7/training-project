import { StoryFn, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CommentForm } from './CommentForm';

export default {
    title: 'entities/Comment/CommentForm',
    component: CommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof CommentForm>;

const Template: StoryFn<typeof CommentForm> = (args) => (
    <CommentForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    onSendComment: action('onSendComment'),
};
