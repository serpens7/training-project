import { loginByUsername } from './loginByUsername';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { $api } from '@/shared/api/api';

jest.mock('@/shared/api/api');

const mockedAxios = jest.mocked($api);

describe('loginByUsername.test', () => {
    test('success login', async () => {
        const userValue = { username: '123', id: '1' };

        mockedAxios.post.mockResolvedValue({
            data: userValue,
        });

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({
            username: '123',
            password: '123',
        });
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        mockedAxios.post.mockRejectedValue(new Error('login error'));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({
            username: '123',
            password: '123',
        });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('login error');
    });
});