import { classNames } from 'shared/lib/classNames';

describe('classnames', () => {
  test('with only 1 parameter', () => {
    expect(classNames('someClass')).toBe('someClass');
  });
  test('with additional class', () => {
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe('someClass class1 class2');
  });
  test('with only 2 parameters', () => {
    expect(classNames('someClass', {})).toBe('someClass');
  });
  test('with mods parameters', () => {
    const expected = 'someClass hovered scrollable';
    expect(classNames(
      'someClass',
      { hovered: true, scrollable: true },
    )).toBe(expected);
  });
  test('with mods parameters where one of parameters equals false', () => {
    const expected = 'someClass hovered';
    expect(classNames(
      'someClass',
      { hovered: true, scrollable: false },
    )).toBe(expected);
  });
  test('with mods undefined', () => {
    const expected = 'someClass hovered';
    expect(classNames(
      'someClass',
      { hovered: true, scrollable: undefined },
    )).toBe(expected);
  });
});
