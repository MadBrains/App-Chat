import { describe, expect, test } from '@jest/globals';
import { declination } from 'src/utils/helpers/declination';

describe('declination', () => {
  test('Test first declination', () => {
    expect(declination(1, 'участник')).toBe('участник');
  });
  test('Test second declination', () => {
    expect(declination(2, 'участник')).toBe('участника');
  });
  test('Test third declination', () => {
    expect(declination(5, 'участник')).toBe('участников');
  });
});
