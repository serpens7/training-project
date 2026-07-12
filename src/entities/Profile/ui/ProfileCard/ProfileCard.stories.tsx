import { Meta, StoryFn } from '@storybook/react';
import { Country } from '@/entities/Country/@x/Profile';
import { Currency } from '@/entities/Currency/@x/Profile';
import avatar from '@/shared/assets/icons/user-32-32.png';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Russia,
        lastname: 'abv',
        first: 'asd',
        city: 'asf',
        currency: Currency.USD,
        avatar,
    },
};

export const withError = Template.bind({});
withError.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
