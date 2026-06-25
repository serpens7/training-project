import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui/Page/Page';

const MainPage = () => {
    const { t } = useTranslation();

    return <Page>{t('main.title')}</Page>;
};

export default MainPage;
