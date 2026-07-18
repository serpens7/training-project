import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

describe('Popover', () => {
    test('renders the trigger', () => {
        render(
            <Popover trigger={<span>Open</span>}>
                <span>Panel content</span>
            </Popover>
        );

        expect(screen.getByText('Open')).toBeInTheDocument();
    });

    test('panel content is not rendered before the trigger is clicked', () => {
        render(
            <Popover trigger={<span>Open</span>}>
                <span>Panel content</span>
            </Popover>
        );

        expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
    });

    test('clicking the trigger reveals the panel content', async () => {
        const user = userEvent.setup();
        render(
            <Popover trigger={<span>Open</span>}>
                <span>Panel content</span>
            </Popover>
        );

        await user.click(screen.getByText('Open'));

        expect(await screen.findByText('Panel content')).toBeInTheDocument();
    });
});
