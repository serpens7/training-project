import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';
import { isUserManager } from './isUserManager';

describe('isUserManager', () => {
    test('should return true when user has MANAGER role', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: { id: '1', username: 'manager', roles: [UserRole.MANAGER] },
                inited: true,
            },
        };

        expect(isUserManager(state as StateSchema)).toBe(true);
    });

    test('should return true when user has ADMIN role too', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: { id: '1', username: 'admin', roles: [UserRole.ADMIN] },
                inited: true,
            },
        };

        expect(isUserManager(state as StateSchema)).toBe(true);
    });

    test('should return false when user has USER role only', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: { id: '2', username: 'user', roles: [UserRole.USER] },
                inited: true,
            },
        };

        expect(isUserManager(state as StateSchema)).toBe(false);
    });

    test('should return false when there are no roles', () => {
        const state: DeepPartial<StateSchema> = {
            user: { authData: { id: '2', username: 'user' }, inited: true },
        };

        expect(isUserManager(state as StateSchema)).toBe(false);
    });
});
