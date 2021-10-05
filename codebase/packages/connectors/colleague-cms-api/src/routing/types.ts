type PageId = string;

type PageRelated = {
  id: number;
  contentType: 'page';
  collectionName: 'pages';
};

type Related = PageRelated;

type PageConfig = {
  id: PageId;
  title: string;
  templateName: string;
  path: string;
  slug: string;
  parent?: PageId;
  menuAttached: boolean;
  related: Related;
};

type NavItemConfig =
  | {
      type: 'internal';
      page: PageId;
      label: string;
    }
  | {
      type: 'external';
      url: string;
      label: string;
    };

type CmsRoutingResponse = {
  pages: Record<PageId, PageConfig>;
  nav: Record<PageId, NavItemConfig[]> & { root: NavItemConfig[] };
};

export type { PageConfig, NavItemConfig, CmsRoutingResponse };
