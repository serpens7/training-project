import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';
import { getUserRoles } from './getUserRoles';

describe('getUserRoles', () => {
    test('should return roles from authData', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: { id: '1', username: 'admin', roles: [UserRole.ADMIN] },
                inited: true,
            },
        };

        expect(getUserRoles(state as StateSchema)).toEqual([UserRole.ADMIN]);
    });

    test('should return undefined when there is no authData', () => {
        const state: DeepPartial<StateSchema> = {
            user: { inited: true },
        };

        expect(getUserRoles(state as StateSchema)).toBeUndefined();
    });

    test('should return undefined when authData has no roles', () => {
        const state: DeepPartial<StateSchema> = {
            user: { authData: { id: '1', username: 'admin' }, inited: true },
        };

        expect(getUserRoles(state as StateSchema)).toBeUndefined();
    });
});
