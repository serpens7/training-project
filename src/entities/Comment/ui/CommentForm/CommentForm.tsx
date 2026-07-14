import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
import cls from './CommentForm.module.scss';

export interface CommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

export const CommentForm = memo((props: CommentFormProps) => {
    const { className = '', onSendComment } = props;
    const { t } = useTranslation();
    const [text, setText] = useState('');

    const onSendHandler = () => {
        onSendComment(text);
        setText('');
    };

    return (
        <HStack
            max
            justify='between'
            className={classNames(cls.CommentForm, {}, [className])}
        >
            <Input
                className={cls.input}
                placeholder={t('comments.enterText')}
                value={text}
                onChange={setText}
            />
            <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
                {t('comments.send')}
            </Button>
        </HStack>
    );
});
