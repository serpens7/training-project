import { classNames } from "./classNames";
describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('test')).toBe('test');
    });

    test('with additional class', () => {
        expect(classNames('test', {}, ['class1', 'class2'])).toBe('test class1 class2');
    });

    test('with mods', () => {
        expect(classNames('test', { class1: true, class2: false }, [])).toBe('test class1');
    });
});