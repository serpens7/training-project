import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CommentForm, CommentList } from '@/entities/Comment';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack';
import { getUserAuthData } from '@/entities/User';
import {
    useAddArticleComment,
    useGetArticleComments,
} from '../../api/articleCommentsApi';

interface ArticleCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleComments = memo((props: ArticleCommentsProps) => {
    const { className = '', id } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const {
        data: comments,
        isLoading,
    } = useGetArticleComments(id ?? '', { skip: !id });
    const [addComment] = useAddArticleComment();

    const onSendComment = useCallback(
        (text: string) => {
            if (!id || !userData) {
                return;
            }
            addComment({ articleId: id, userId: userData.id, text });
        },
        [addComment, id, userData],
    );

    return (
        <VStack gap='16' max className={classNames('', {}, [className])}>
            <Text size={TextSize.L} title={t('article.comments')} />
            <CommentForm onSendComment={onSendComment} />
            <CommentList isLoading={isLoading} comments={comments} />
        </VStack>
    );
});
