import { StateSchema } from '@/app/providers/StoreProvider';
import { getAddCommentFormError, getAddCommentFormText } from './addCommentFormSelectors';

describe('addCommentFormSelectors.test', () => {
    test('should return text', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: { text: 'hello' },
        };
        expect(getAddCommentFormText(state as StateSchema)).toBe('hello');
    });

    test('should work with empty state text', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormText(state as StateSchema)).toBeUndefined();
    });

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: { error: 'some error' },
        };
        expect(getAddCommentFormError(state as StateSchema)).toBe('some error');
    });

    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormError(state as StateSchema)).toBeUndefined();
    });
});
