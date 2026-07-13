import { StoryFn, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Открыть меню</Button>,
    items: [
        { content: 'Профиль', href: '/' },
        { content: 'Настройки', onClick: action('settings') },
        { content: 'Выйти', onClick: action('logout') },
    ],
};

export const TopDirection = Template.bind({});
TopDirection.args = {
    direction: 'top',
    trigger: <Button>Открыть вверх</Button>,
    items: [
        { content: 'Профиль', href: '/' },
        { content: 'Недоступно', disabled: true },
        { content: 'Выйти', onClick: action('logout') },
    ],
};
