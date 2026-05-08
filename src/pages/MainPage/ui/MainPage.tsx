import { useTranslation } from 'react-i18next';

const MainPage = (args?: any) => {
    const { t } = useTranslation();

    return <div>{t('main.page')}</div>;
};

export default MainPage;
