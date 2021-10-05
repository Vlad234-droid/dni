export interface OpenIdUserInfo
  extends OpenIdUserInfoBase,
    Partial<OpenIdUserInfoProfileScope>,
    Partial<OpenIdUserInfoGroupsScope>,
    Partial<OpenIdUserInfoParamsScope> {}

export interface OpenIdUserInfoBase {
  sub: string;
  preferred_username: string;
  name: string;
  at_hash: string;
  sid: string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  custom_fields?: Partial<OpenIdUserInfoCustomFields>;
}

export interface OpenIdUserInfoProfileScope {
  updated_at: string;
  given_name: string;
  family_name: string;
}

export interface OpenIdUserInfoParamsScope {
  params: OpenIdUserInfoParams;
}

export interface OpenIdUserInfoGroupsScope {
  groups: string[];
}

export interface OpenIdUserInfoParams {
  employeeNumber?: string;
  Surname?: string;
  EmployeeNumber?: string;
  EmployeeID?: string;
  Givenname?: string;
}

export interface OpenIdUserInfoCustomFields {
  Email_or_UPN_Subject: string;
  displayName: string;
  employeeID: string;
  employeeType: string;
  external_id: string;
  employeeNumber: string;
  businessCategory: "Office" | "Store" | "Distribution" | "Depot" | "Depots";
}
