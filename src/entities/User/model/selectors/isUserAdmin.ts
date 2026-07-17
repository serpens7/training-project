import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../consts/userConsts';
import { getUserRoles } from './getUserRoles';

export const isUserAdmin = createSelector(
    getUserRoles,
    (roles) => Boolean(roles?.includes(UserRole.ADMIN)),
);
