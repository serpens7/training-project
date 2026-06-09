import { AddCommentFormSchema } from '../types/addCommentForm';
import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';

describe('addCommentFormSlice.test', () => {
    test('should set text', () => {
        const state: AddCommentFormSchema = { text: '' };
        expect(
            addCommentFormReducer(state, addCommentFormActions.setText('hello')),
        ).toEqual({ text: 'hello' });
    });

    test('should clear text', () => {
        const state: AddCommentFormSchema = { text: 'some text' };
        expect(
            addCommentFormReducer(state, addCommentFormActions.setText('')),
        ).toEqual({ text: '' });
    });

    test('should work with undefined state', () => {
        expect(
            addCommentFormReducer(undefined, addCommentFormActions.setText('test')),
        ).toEqual({ text: 'test' });
    });
});
