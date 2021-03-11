type Role = {
  id: number;
  title: string;
};

type Gender = 'M' | 'W';

type User = {
  colleagueUUID: string;
  roles: Role[];
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  gender: Gender;
  employeeId: string;
  businessType: string;
  ageRange: string;
  countryCode: string;
  // TODO: change to enums
  genderIdentity: string;
  sexualOrientation: string;
  ethnicity: string;
  marriage: boolean;
  religionOrBelief: string;
  caringResponsibilities: string;
  armedForcesAffiliation: string;
};

export type { User, Role, Gender };
