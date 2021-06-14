import { pages } from 'features/Page';

import { BuildPath, BuildRoute } from '../config/types';

export const buildPath: BuildPath = (
  page,
  root = '/',
  prefix = '',
  sufix = '',
) => {
  return `${root}${page}${prefix}${sufix}`;
};

export const buildRoute: BuildRoute = (page, exact = true) => {
  const Component = pages[page];

  return {
    path: buildPath(page),
    Component,
    exact,
    page,
  };
};
