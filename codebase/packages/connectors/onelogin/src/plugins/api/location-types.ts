export type LocationResponse = {
  location: {
    id: string;
    name: string;
    types?: string[];
    country: {
      countryCode: string;
      subdivision: string;
    };
    contact?: {
      phoneNumbers: {
        main: string;
      };
    };
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    alternativeIds?: {
      branchNumber: number;
      ceStoreNumber: number;
      thStoreNumber: number;
      myStoreNumber: number;
      oneStopStoreNumber: number;
      dcNumber: number;
    };
    address?: {
      id: string;
      link: string;
    };
    lifecycle?: {
      status: string;
      openingDate: string;
      closingDate: string;
      refitStartDate: string;
      refitEndDate: string;
    };
    format?: {
      storeFormat: string;
      detailedStoreFormat: string;
      planningFormat: string;
    };
    openingHours?: {
      openingHours: {
        standard: Record<
          | "monday"
          | "tuesday"
          | "wednesday"
          | "thursday"
          | "friday"
          | "saturday"
          | "sunday",
          { intervals: Interval[] }
        >;
        exceptions: Exception;
      };
    };
    facilities?: Facility[];
    organizationalHierarchy?: {
      storeDirector: {
        initials: string;
        number: string;
      };
      organizationalDirector: {
        initials: string;
      };
    };
  };
  revisionId?: string;
  distance?: {
    kilometers: number;
    miles: number;
  };
  children?: Children[];
  parent?: {
    id: string;
    name: string;
    types: string[];
    link: string;
  };
};

type Interval = {
  start: string;
  end: string;
};

type Exception = {
  [key: string]: {
    intervals: Interval[];
  };
};

type Facility = {
  type: string;
  tags: string[];
};

type Children = {
  id: string;
  name: string;
  types: string[];
  link: string;
};

export type LocationField =
  | "address"
  | "alternativeIds"
  | "contact"
  | "coordinates"
  | "country"
  | "facilities"
  | "format"
  | "id"
  | "lifecycle"
  | "name"
  | "types"
  | "openingHours"
  | "organizationalHierarchy";
