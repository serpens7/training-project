import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import cls from './LoginForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { FormEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import {
    getLoginError,
    getLoginIsLoading,
    getLoginPassword,
    getLoginUsername,
} from '../../model/selectors/getLoginFunctions';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/app/providers/config/DynamicModuleLoader';
import { loginByUsername } from '../../model/services/loginByUsername';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

export interface LoginFormProps {
    onSuccess?: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

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

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled' && onSuccess) onSuccess();
    }, [dispatch, username, password, onSuccess]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLoginClick();
    };

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <form
                className={classNames(cls.LoginForm, {}, [])}
                onSubmit={onSubmit}
            >
                <Text title={t('Форма авторизации')} />
                {error && (
                    <Text theme={TextTheme.ERROR} text={t('login.error')} />
                )}
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
                <Button
                    className={cls.loginBtn}
                    type='submit'
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
