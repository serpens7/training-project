import { Meta, StoryFn } from '@storybook/react';
import { NotificationList } from './NotificationList';

export default {
    title: 'entities/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof NotificationList>;

const Template: StoryFn<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    items: [
        {
            id: '1',
            title: 'Новая статья опубликована',
            href: '/articles/1',
            isViewed: false,
        },
        {
            id: '2',
            title: 'Комментарий к вашей статье',
            description: 'Кто-то оставил комментарий',
            isViewed: true,
        },
    ],
};

export const Empty = Template.bind({});
Empty.args = {
    items: [],
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
