import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleRecommendationsList>;

const Template: StoryFn<typeof ArticleRecommendationsList> = (args) => (
    <ArticleRecommendationsList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
