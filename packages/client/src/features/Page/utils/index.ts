export const getBackLink = () => {
  const pathArray = window.location.pathname.split('/');
  pathArray.splice(-1, 1);

  return pathArray.join('/');
};
