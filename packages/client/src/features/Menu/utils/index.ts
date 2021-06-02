export const getPageByPath = (path: string) => path.substring(1);

export const isActivePage = (path: string, page: string) =>
  path.split('/')[1] === page;
