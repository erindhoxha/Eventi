import { getIconByRoute } from './getIconByRoute';

describe('getIconByRoute', () => {
  it('should return the correct icon name for the route', () => {
    expect(getIconByRoute('TabBookmarks')).toBe('book');
    expect(getIconByRoute('TabAccount')).toBe('user');
    expect(getIconByRoute('TabHome')).toBe('home');
  });
});
