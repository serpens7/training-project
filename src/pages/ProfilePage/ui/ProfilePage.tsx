import {
    DynamicModuleLoader,
    ReducersList,
} from '@/app/providers/config/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { fetchProfileData, profileReducer } from '@/entities/Profile';
import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ProfileCard } from '@/entities/Profile/ui/ProfileCard/ProfileCard';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className = '' }: ProfilePageProps) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfileCard />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
