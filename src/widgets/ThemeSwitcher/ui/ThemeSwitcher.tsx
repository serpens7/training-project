import { classNames } from '@/shared/lib/classNames';
import cls from './ThemeSwitcher.module.scss';
import { Button, ThemeButton } from '@/shared/Button/Button';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className = '' }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
};
