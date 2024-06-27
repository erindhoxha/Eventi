export const getIconByRoute = (routeName: string) => {
  switch (routeName) {
    case 'TabBookmarks':
      return 'book';
    case 'TabAccount':
      return 'user';
    default:
      return 'home';
  }
};
