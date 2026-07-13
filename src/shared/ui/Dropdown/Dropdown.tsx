import { ReactNode } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

type DropdownDirection = 'top' | 'bottom';

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

const mapDirectionToAnchor = {
    top: 'top end',
    bottom: 'bottom end',
} as const;

export function Dropdown(props: DropdownProps) {
    const { className = '', trigger, items, direction = 'bottom' } = props;

    return (
        <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
            <MenuButton className={cls.btn}>{trigger}</MenuButton>
            <MenuItems
                anchor={{ to: mapDirectionToAnchor[direction], gap: 4 }}
                className={cls.menu}
            >
                {items.map((item, index) => {
                    const key = `dropdown-item-${index}`;

                    if (item.href) {
                        return (
                            <MenuItem
                                key={key}
                                as={Link}
                                to={item.href}
                                disabled={item.disabled}
                                className={cls.item}
                            >
                                {item.content}
                            </MenuItem>
                        );
                    }

                    return (
                        <MenuItem
                            key={key}
                            as='button'
                            type='button'
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={cls.item}
                        >
                            {item.content}
                        </MenuItem>
                    );
                })}
            </MenuItems>
        </Menu>
    );
}
