import { FC, lazy } from 'react';

export const LoginFormAsync = lazy<FC>(() => import('./LoginForm'));
