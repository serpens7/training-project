import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { getProfileData, getProfileForm, getProfileReadonly } from '../../model/selectors/getProfile';
import { profileActions } from '../../model/slice/profileSlice';
import { useUpdateProfileMutation } from '../../api/profileApi';
import { validateProfileData } from '../../model/services/validateProfileData';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';

interface EditableProfileCardHeaderProps {
    className?: string;
    id?: string;
}

export const EditableProfileCardHeader = (props: EditableProfileCardHeaderProps) => {
    const { className = '', id } = props;

    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

    const readonly = useSelector(getProfileReadonly);
    const formData = useSelector(getProfileForm);
    const dispatch = useAppDispatch();

    const [updateProfile] = useUpdateProfileMutation({ fixedCacheKey: 'update-profile' });

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(async () => {
        const errors = validateProfileData(formData);

        if (errors.length) {
            dispatch(profileActions.setValidateErrors(errors));
            return;
        }

        if (!id || !formData) return;

        try {
            await updateProfile({ profileId: id, data: formData }).unwrap();
            dispatch(profileActions.setReadonly(true));
            dispatch(profileActions.setValidateErrors(undefined));
        } catch (e) {
            dispatch(profileActions.setValidateErrors([ValidateProfileError.SERVER_ERROR]));
        }
    }, [dispatch, formData, id, updateProfile]);

    return (
        <HStack max justify='between' className={classNames('', {}, [className])}>
            <Text title={t('profile.title')} />
            {canEdit && (
                <div>
                    {readonly ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                            data-testid='EditableProfileCardHeader.EditButton'
                        >
                            {t('button.edit')}
                        </Button>
                    ) : (
                        <HStack gap='8'>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancelEdit}
                                data-testid='EditableProfileCardHeader.CancelButton'
                            >
                                {t('button.cancel')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                                data-testid='EditableProfileCardHeader.SaveButton'
                            >
                                {t('button.save')}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    );
};
