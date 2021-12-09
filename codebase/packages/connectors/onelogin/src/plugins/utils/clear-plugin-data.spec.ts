import express from "express";
import jwt from "jsonwebtoken";
import * as TypeMoq from "typemoq";
import { getOpenIdAuthData } from "../../oidc-data-extractor";
import { clearPluginCookiesIfSessionExpired } from "./clear-plugin-cookies";

describe("clearPluginCookiesIfSessionExpired", () => {
  it("clears main cookie on sid mismatch", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    response
      .setup((x) => getOpenIdAuthData(x))
      .returns(() => {
        return {
          authToken: jwt.sign({ sid: "sid" }, "secret"),
        };
      });

    const request = TypeMoq.Mock.ofType<express.Request>();
    request
      .setup((x) => x.signedCookies)
      .returns(() => ({
        cookieName: { sid: "expired-sid" },
        refreshCookieName: "refreshCookie",
      }));

    response
      .setup((x) =>
        x.clearCookie(TypeMoq.It.isValue("cookieName"), TypeMoq.It.isAny()),
      )
      .verifiable(TypeMoq.Times.exactly(1));

    clearPluginCookiesIfSessionExpired(request.object, response.object, {
      cookieName: "cookieName",
    });

    response.verifyAll();
  });

  it("clears main cookie and additional cookies  on sid mismatch", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    response
      .setup((x) => getOpenIdAuthData(x))
      .returns(() => {
        return {
          authToken: jwt.sign({ sid: "sid" }, "secret"),
        };
      });

    const request = TypeMoq.Mock.ofType<express.Request>();
    request
      .setup((x) => x.signedCookies)
      .returns(() => ({
        cookieName: { sid: "expired-sid" },
        refreshCookieName: "refreshCookie",
      }));

    response
      .setup((x) =>
        x.clearCookie(TypeMoq.It.isValue("cookieName"), TypeMoq.It.isAny()),
      )
      .verifiable(TypeMoq.Times.exactly(1));
    response
      .setup((x) =>
        x.clearCookie(
          TypeMoq.It.isValue("refreshCookieName"),
          TypeMoq.It.isAny(),
        ),
      )
      .verifiable(TypeMoq.Times.exactly(1));

    clearPluginCookiesIfSessionExpired(
      request.object,
      response.object,
      { cookieName: "cookieName" },
      [{ cookieName: "refreshCookieName" }],
    );

    response.verifyAll();
  });

  it("clears request cookies", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    response
      .setup((x) => getOpenIdAuthData(x))
      .returns(() => {
        return {
          authToken: jwt.sign({ sid: "sid" }, "secret"),
        };
      });

    const request = ({
      cookies: {
        cookieName: "cookie",
        otherCookie: "otherCookie",
      },
      signedCookies: {
        refreshCookie: "refresh cookie",
        otherSignedCookie: "otherSignedCookie",
      },
    } as any) as express.Request;

    response
      .setup((x) =>
        x.clearCookie(TypeMoq.It.isValue("cookieName"), TypeMoq.It.isAny()),
      )
      .verifiable(TypeMoq.Times.exactly(1));

    clearPluginCookiesIfSessionExpired(
      request,
      response.object,
      {
        cookieName: "cookieName",
      },
      [{ cookieName: "refreshCookie" }],
    );

    response.verifyAll();
    expect(request.signedCookies).toEqual({
      otherSignedCookie: "otherSignedCookie",
    });
    expect(request.cookies).toEqual({ otherCookie: "otherCookie" });
  });

  it("doesn't clear plugin cookies if sid matches", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    response
      .setup((x) => getOpenIdAuthData(x))
      .returns(() => {
        return {
          authToken: jwt.sign({ sid: "sid" }, "secret"),
        };
      });

    const request = TypeMoq.Mock.ofType<express.Request>();
    request
      .setup((x) => x.signedCookies)
      .returns(() => ({
        cookieName: { sid: "sid" },
        refreshCookieName: "refreshCookie",
      }));

    response
      .setup((x) =>
        x.clearCookie(TypeMoq.It.isValue("cookieName"), TypeMoq.It.isAny()),
      )
      .verifiable(TypeMoq.Times.never());
    response
      .setup((x) =>
        x.clearCookie(
          TypeMoq.It.isValue("refreshCookieName"),
          TypeMoq.It.isAny(),
        ),
      )
      .verifiable(TypeMoq.Times.never());

    clearPluginCookiesIfSessionExpired(
      request.object,
      response.object,
      { cookieName: "cookieName" },
      [{ cookieName: "refreshCookieName" }],
    );

    response.verifyAll();
  });

  it("doesn't clear plugin cookies if OneLogin AuthData not present in response", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();
    response.setup((x) => getOpenIdAuthData(x)).returns(() => undefined);

    const request = TypeMoq.Mock.ofType<express.Request>();
    request
      .setup((x) => x.signedCookies)
      .returns(() => ({
        cookieName: { sid: "sid" },
        refreshCookieName: "refreshCookie",
      }));

    response
      .setup((x) =>
        x.clearCookie(TypeMoq.It.isValue("cookieName"), TypeMoq.It.isAny()),
      )
      .verifiable(TypeMoq.Times.never());
    response
      .setup((x) =>
        x.clearCookie(
          TypeMoq.It.isValue("refreshCookieName"),
          TypeMoq.It.isAny(),
        ),
      )
      .verifiable(TypeMoq.Times.never());

    clearPluginCookiesIfSessionExpired(
      request.object,
      response.object,
      { cookieName: "cookieName" },
      [{ cookieName: "refreshCookieName" }],
    );

    response.verifyAll();
  });
});
