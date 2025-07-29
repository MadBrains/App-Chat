import { parseUserNameForAvatar } from 'src/utils/helpers/parseUserNameForAvatar';
import { describe, expect, test } from '@jest/globals';

describe('parseUserNameForAvatar', () => {
  test('Test user avatar from nickname', () => {
    expect(parseUserNameForAvatar({ firstName: 'Салават', lastName: 'Мавлиханов' })).toBe('СМ');
  });
  test('Test user avatar from nickname s', () => {
    expect(parseUserNameForAvatar({ firstName: 'салават', surName: 'Ринатович' })).toBe('СР');
  });
  test('Test user avatar empty case', () => {
    expect(parseUserNameForAvatar({})).toBe('MB')
  });
  test('Test user avatar with firstName', () => {
    expect(parseUserNameForAvatar({firstName:'Салават'})).toBe('СА')
  });
  test('Test empty firstName', () => {
    expect(parseUserNameForAvatar({firstName:''})).toBe('MB')
  })
  test('Test 1 symbol in firstName', () => {
    expect(parseUserNameForAvatar({firstName:'C'})).toBe('MB')
  })
  test('Test 1 symbol in lastName', () => {
    expect(parseUserNameForAvatar({lastName:'C'})).toBe('MB')
  })
});
