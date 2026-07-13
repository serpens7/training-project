import { StoryFn, Meta } from '@storybook/react';
import { ArticleComments } from './ArticleComments';

export default {
    title: 'features/ArticleComments',
    component: ArticleComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleComments>;

const Template: StoryFn<typeof ArticleComments> = (args) => (
    <ArticleComments {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    id: '1',
};
