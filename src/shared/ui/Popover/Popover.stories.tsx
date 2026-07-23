import { StoryFn, Meta } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

export default {
    title: 'shared/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = (args) => <Popover {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Открыть попап</Button>,
    children: <Text title='Контент попапа' text='Произвольное содержимое' />,
};

export const TopDirection = Template.bind({});
TopDirection.args = {
    direction: 'top',
    trigger: <Button>Открыть вверх</Button>,
    children: <Text title='Контент попапа' text='Произвольное содержимое' />,
};
