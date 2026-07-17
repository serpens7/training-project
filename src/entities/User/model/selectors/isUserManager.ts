import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../consts/userConsts';
import { getUserRoles } from './getUserRoles';

export const isUserManager = createSelector(
    getUserRoles,
    (roles) => Boolean(roles?.includes(UserRole.MANAGER) || roles?.includes(UserRole.ADMIN)),
);
