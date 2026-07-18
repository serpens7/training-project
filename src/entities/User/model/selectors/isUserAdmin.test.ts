import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';
import { isUserAdmin } from './isUserAdmin';

describe('isUserAdmin', () => {
    test('should return true when user has ADMIN role', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: { id: '1', username: 'admin', roles: [UserRole.ADMIN] },
                inited: true,
            },
        };

        expect(isUserAdmin(state as StateSchema)).toBe(true);
    });

    test('should return false when user has other roles only', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: { id: '2', username: 'user', roles: [UserRole.USER] },
                inited: true,
            },
        };

        expect(isUserAdmin(state as StateSchema)).toBe(false);
    });

    test('should return false when there are no roles', () => {
        const state: DeepPartial<StateSchema> = {
            user: { authData: { id: '2', username: 'user' }, inited: true },
        };

        expect(isUserAdmin(state as StateSchema)).toBe(false);
    });

    test('should return false when there is no authData', () => {
        const state: DeepPartial<StateSchema> = {
            user: { inited: true },
        };

        expect(isUserAdmin(state as StateSchema)).toBe(false);
    });
});
