import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { FormEvent } from 'react';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className = '' }: LoginFormProps) => {
    const { t } = useTranslation();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form
            className={classNames(cls.LoginForm, {}, [className])}
            onSubmit={onSubmit}
        >
            <Input
                autofocus
                type='text'
                className={cls.input}
                placeholder={t('Введите username')}
            />

            <Input
                type='password'
                className={cls.input}
                placeholder={t('Введите пароль')}
            />

            <Button className={cls.loginBtn} type='submit'>
                {t('Войти')}
            </Button>
        </form>
    );
};
