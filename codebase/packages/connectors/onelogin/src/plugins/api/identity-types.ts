// https://github.dev.global.tesco.org/Customer-API-Platform/identityservice/wiki/Endpoint:-V4-Issue-Token#client-credentials
export type ClientTokenIssueBody = { grant_type: "client_credentials" };

//https://github.dev.global.tesco.org/Customer-API-Platform/identityservice/wiki/Endpoint:-V4-Issue-Token#token-exchange
export type UserTokenExchangeBody = {
  grant_type: "token_exchange";
  trusted_token: string;
  identity_provider: "onelogin";
  token_type: "oidc" | "saml";
  scope: "internal public";
};

// https://github.dev.global.tesco.org/Customer-API-Platform/identityservice/wiki/Endpoint:-V4-Issue-Token#refresh-token
export type UserRefreshTokenBody = {
  grant_type: "refresh_token";
  refresh_token: string;
};

//https://github.dev.global.tesco.org/Customer-API-Platform/identityservice/wiki/Endpoint:-V4-Issue-Token#response-body
export type UserScopeToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  claims: IdentityClaims;
};

export type ClientScopeToken = Omit<UserScopeToken, "refresh_token">;

export type IdentityClaims = {
  jti: string;
  iss: string;
  sub: string;
  iat: number;
  nbf: number;
  exp: number;
  scope: string;
  confidence_level: number;
  client_id: string;
  token_type: string;
};
