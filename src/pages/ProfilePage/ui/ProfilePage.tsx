import {
    DynamicModuleLoader,
    ReducersList,
} from '@/app/providers/config/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { profileReducer } from '@/entities/Profile';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className = '' }: ProfilePageProps) => {
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                {t('profile.page')}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
