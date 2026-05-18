import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { FormEvent, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import {
    getLoginError,
    getLoginIsLoading,
    getLoginPassword,
    getLoginUsername,
} from '../../model/selectors/getLoginFunctions';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className = '' }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback(
        (value) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLoginClick();
    };

    return (
        <form
            className={classNames(cls.LoginForm, {}, [className])}
            onSubmit={onSubmit}
        >
            <Text title={t('Форма авторизации')} />
            {error && <Text theme={TextTheme.ERROR} text={t('login.error')} />}
            <Input
                autofocus
                type='text'
                className={cls.input}
                placeholder={t('Введите username')}
                onChange={onChangeUsername}
                value={username}
            />

            <Input
                type='password'
                className={cls.input}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
            />
            <Button className={cls.loginBtn} type='submit' disabled={isLoading}>
                {t('Войти')}
            </Button>
        </form>
    );
});
