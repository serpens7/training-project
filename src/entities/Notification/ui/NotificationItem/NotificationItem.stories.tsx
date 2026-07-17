import { Meta, StoryFn } from '@storybook/react';
import { NotificationItem } from './NotificationItem';

export default {
    title: 'entities/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof NotificationItem>;

const Template: StoryFn<typeof NotificationItem> = (args) => (
    <NotificationItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    notification: {
        id: '1',
        title: 'Новая статья опубликована',
        description: 'Посмотрите последнюю статью про React 19',
        href: '/articles/1',
    },
};

export const WithoutLink = Template.bind({});
WithoutLink.args = {
    notification: {
        id: '2',
        title: 'Системное уведомление',
        description: 'Профиль успешно обновлён',
    },
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
