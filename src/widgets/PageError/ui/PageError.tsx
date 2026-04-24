import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames';
import cls from './PageError.module.scss';
import { Button } from '@/shared/Button/Button';

interface PageErrorProps {
    className?: string;
}

const reloadPage = () => {
    window.location.reload();
};

export const PageError = ({ className = '' }: PageErrorProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>{t('error.occured')}</p>
            <Button onClick={() => reloadPage()}>{t('error.reload')}</Button>
        </div>
    );
};
