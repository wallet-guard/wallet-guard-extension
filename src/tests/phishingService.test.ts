import { filterURLQueryParameters } from '../lib/helpers/util';

describe('filterURLQueryParameters', () => {
  it('should remove sensitive query parameters', () => {
    const url = 'https://example.com?username=user&email=test@example.com&non_sensitive=data';
    const expected = 'https://example.com/?non_sensitive=data';
    expect(filterURLQueryParameters(url)).toBe(expected);
  });

  it('should handle URLs without query parameters', () => {
    const url = 'https://example.com';
    const expected = 'https://example.com/';
    expect(filterURLQueryParameters(url)).toBe(expected);
  });

  it('should handle URLs with mixed case query parameters', () => {
    const url = 'https://example.com?UserName=user&EMAIL=test@example.com';
    const expected = 'https://example.com/';
    expect(filterURLQueryParameters(url)).toBe(expected);
  });

  it('should not remove non-sensitive query parameters', () => {
    const url = 'https://example.com?data=value&info=morevalue';
    const expected = 'https://example.com/?data=value&info=morevalue';
    expect(filterURLQueryParameters(url)).toBe(expected);
  });

  it('should handle multiple sensitive query parameters', () => {
    const url = 'https://example.com?username=user&password=pass123&token=abc123';
    const expected = 'https://example.com/';
    expect(filterURLQueryParameters(url)).toBe(expected);
  });

  it('should handle encoded and special characters in query parameters', () => {
    const url = 'https://example.com?username=user&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback';
    const expected = 'https://example.com/?redirect_uri=https%3A%2F%2Fexample.com%2Fcallback';
    expect(filterURLQueryParameters(url)).toBe(expected);
  });
});

it('should return the same URL if there are no sensitive query parameters', () => {
  const url = 'https://example.com/?data=value&info=morevalue';
  expect(filterURLQueryParameters(url)).toBe(url);
});

it('should handle URLs with empty query parameters correctly', () => {
  const url = 'https://example.com?username=&token=';
  const expected = 'https://example.com/';
  expect(filterURLQueryParameters(url)).toBe(expected);
});

it('should handle multiple instances of the same sensitive parameter', () => {
  const url = 'https://example.com?user=user1&user=user2&info=morevalue';
  const expected = 'https://example.com/?info=morevalue';
  expect(filterURLQueryParameters(url)).toBe(expected);
});

it('should preserve hash fragments in URLs', () => {
  const url = 'https://example.com?username=user#contact';
  const expected = 'https://example.com/#contact';
  expect(filterURLQueryParameters(url)).toBe(expected);
});

it('should correctly handle URLs with complex encoded components', () => {
  const url = 'https://example.com?redirect_uri=https%3A%2F%2Fexample.com%2Fpath%3Farg%3Dvalue&user=user';
  const expected = 'https://example.com/?redirect_uri=https%3A%2F%2Fexample.com%2Fpath%3Farg%3Dvalue';
  expect(filterURLQueryParameters(url)).toBe(expected);
});

it('should handle complex real-world URLs', () => {
  const url = 'https://example.com?user=user&password=pass&token=123&lang=en&session=abc123&page=1';
  const expected = 'https://example.com/?lang=en&page=1';
  expect(filterURLQueryParameters(url)).toBe(expected);
});
