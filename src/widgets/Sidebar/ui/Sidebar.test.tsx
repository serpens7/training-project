import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('should toggle collapsed class on click', () => {
        render(<Sidebar />);

        const sidebar = screen.getByText('toggle').closest('div');

        expect(sidebar).toBeInTheDocument();
        expect(sidebar).not.toHaveClass('collapsed');

        const toggleBtn = screen.getByText('toggle');

        fireEvent.click(toggleBtn);

        expect(sidebar).toHaveClass('collapsed');

        fireEvent.click(toggleBtn);

        expect(sidebar).not.toHaveClass('collapsed');
    });
});
