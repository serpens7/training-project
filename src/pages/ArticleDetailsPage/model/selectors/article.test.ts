import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '@/entities/User';
import { getCanEditArticle } from './article';

describe('getCanEditArticle', () => {
    test('should return true when article exists and user is admin', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { data: { id: '1', title: 'title' } },
            user: {
                authData: { id: '1', username: 'admin', roles: [UserRole.ADMIN] },
                inited: true,
            },
        };

        expect(getCanEditArticle(state as StateSchema)).toBe(true);
    });

    test('should return false when article exists but user is not admin', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { data: { id: '1', title: 'title' } },
            user: {
                authData: { id: '2', username: 'user', roles: [UserRole.USER] },
                inited: true,
            },
        };

        expect(getCanEditArticle(state as StateSchema)).toBe(false);
    });

    test('should return false when there is no article', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {},
            user: {
                authData: { id: '1', username: 'admin', roles: [UserRole.ADMIN] },
                inited: true,
            },
        };

        expect(getCanEditArticle(state as StateSchema)).toBe(false);
    });

    test('should return false when there is no user', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { data: { id: '1', title: 'title' } },
            user: { inited: true },
        };

        expect(getCanEditArticle(state as StateSchema)).toBe(false);
    });
});
