import express from "express";
import * as TypeMoq from "typemoq";
import { getIdentitySwapToken } from "./get-token-for-swap";
import { getOpenIdAuthData } from "../../auth-data-extractor";

describe("get token for swap", () => {
  it("returns correct token for given res and oidc strategy", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    response
      .setup((x) => getOpenIdAuthData(x))
      .returns(() => ({
        encRefreshToken: "encRefreshToken",
        authToken: "testToken",
      }));
    const token = getIdentitySwapToken(response.object, "oidc");
    expect(token).toEqual("testToken");
  });

  it("throws an eror if no authToken is present for oidc strategy", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    expect(() => {
      getIdentitySwapToken(response.object, "oidc");
    }).toThrow(Error("No id token found"));
  });

  it("returns correct token for given res and saml strategy", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    response
      .setup((x) => x.oneLoginUserInfo)
      .returns(() => ({
        getSamlResponseXml: () => "testXml",
      }));

    const token = getIdentitySwapToken(response.object, "saml");
    expect(token).toEqual("dGVzdFhtbA==");
  });

  it("throws an eror if incorrect or no saml user info is present for saml strategy", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    expect(() => {
      getIdentitySwapToken(response.object, "saml");
    }).toThrow("No saml profile found");
  });
});
