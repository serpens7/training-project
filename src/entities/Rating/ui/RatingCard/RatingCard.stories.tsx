import { Meta, StoryFn } from '@storybook/react';
import { RatingCard } from './RatingCard';

export default {
    title: 'entities/Rating/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof RatingCard>;

const Template: StoryFn<typeof RatingCard> = (args) => <RatingCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    title: 'Оцените статью',
};

export const WithFeedback = Template.bind({});
WithFeedback.args = {
    title: 'Оцените статью',
    hasFeedback: true,
    feedbackTitle: 'Оставьте отзыв о статье',
};

export const Rated = Template.bind({});
Rated.args = {
    title: 'Оцените статью',
    rate: 4,
};
