import express from "express";
import * as TypeMoq from "typemoq";
import { getDataFromCookie } from "./get-data-from-cookie";

describe("get data from cookie", () => {
  it("returns correct data if correct signed uncompressed and not encrypted cookie is present", () => {
    const request = TypeMoq.Mock.ofType<express.Request>();
    request
      .setup((x) => x.signedCookies)
      .returns(() => ({
        cookieName: "test",
      }));

    const data = getDataFromCookie(request.object, {
      cookieName: "cookieName",
    });
    expect(data).toEqual("test");
  });
  it("returns correct data if correct unsigned cookie is present", () => {
    const request = TypeMoq.Mock.ofType<express.Request>();
    request.setup((x) => x.signedCookies).returns(() => ({}));
    request
      .setup((x) => x.cookies)
      .returns(() => ({
        cookieName: "test",
      }));

    const data = getDataFromCookie(request.object, {
      cookieName: "cookieName",
    });
    expect(data).toEqual("test");
  });
  it("returns correct data if correct compressed cookie is present", () => {
    const request = TypeMoq.Mock.ofType<express.Request>();
    request
      .setup((x) => x.cookies)
      .returns(() => ({
        cookieName:
          "G6UBQBwHzrkrzm4UuFKPpUjM3tacykcvfWC3m60buwJwsuj0rTvQY2Da/x2CJEg658++QB5r8wxzcr67nFhWeuFhyxZDnLJOSAtUUII1EN9BItwaF5vh5p5muwdjvDVbksH6Ckzun/568palTxsrINE9iFYoTbWVgkp9o9Q5yBwABxkUJDbWhHbmg7cC86tfoIWJ1sCauf3sv8q/cs+5qB7PqltO51+RKIClSiEsTVVk8gSlUhQlyxQ6ZSLUqXWU5zETOQWiLYVYFymnGUXBY4eUCYN54gRSrjTLcymVlsIoaYHsHNkmRm2s6GMXLEvwAVYywDqOmTdss6zkKTdUaUI4DA==",
      }));

    const data = getDataFromCookie(request.object, {
      cookieName: "cookieName",
      compressed: true,
    });
    expect(data).toEqual({
      at_hash: "KShX59RrgiBRimsx9Kya3g",
      aud: "89a59610-32b9-0137-fc93-02561ff4456437548",
      exp: 1606843108,
      family_name: "Store",
      given_name: "Unmigrated",
      iat: 1606843048,
      iss: "https://loginppe.ourtesco.com/oidc/2",
      name: "Unmigrated Store",
      params: {
        employeeNumber: "UK99999727",
      },
      preferred_username: "a-uk99999727@dev.global.tesco.org",
      sid: "1dd5a7fc-4550-41e5-957a-6d8902fb13f0",
      sub: "9589348",
      updated_at: 1606843046,
    });
  });
  it("returns correct data if correct encrypted cookie is present", () => {
    const request = TypeMoq.Mock.ofType<express.Request>();
    request
      .setup((x) => x.cookies)
      .returns(() => ({
        cookieName:
          "U2FsdGVkX18rPd/xnwP6adwjFrhfh7oVS2h3WWZI9ncN67lPRkjj8WXGsLx1msQjv+s9ywYAmSN/QJfOwIMxVk6FtIyIuhhOLSXdQuhfdTsjoWzQ9xNAPUvPr82yCJ9NqUX0ojJNGy8EqIzzwHy/C+UV5UhFUAEHeRpkP/zXOAfXm4nU9pfXjHH0T93Irq+0WamRGfNwia6L/F5RyELqsAyGCXuMWdKT+OrBoKOjUhofyL0N7FWKH4jM0acFUMHRs3ZHgYu3N2nFggismomxcxWhtkgSzVeneUCGMb2Liqr3cu7y2u8qAvihKAgOXyM7n5CjUaZB/6Qnp5xseKZHOcvHR0gfwbsvpOyvkLFBo9T9Wab7+F7ctzQgeJ6tUw0TC+jbNJrT2TF4MFpXUf87Cx7f46ByR+D97e5iYHC9fuZvJ1sAcWFefS7JuDQkslSetFRr72MtzQmfQBTucheQgZ3YbUBsd1SVajd8vwu3d5B6jmNqxuV1TtgcYdIj/3wzCeCYb/2qcCJRgIwvKy8+4Hp+j+ENAGyNsT0mvYPXZme3c/jYcpKlJ5eysN4WhJ2E+yKfyhkIvew6qxwkNrAS4Q==",
      }));

    const data = getDataFromCookie(request.object, {
      cookieName: "cookieName",
      secret: "foo bar",
    });
    expect(data).toEqual({
      at_hash: "lMUhVqGqeUtBmn0nvEOP9w",
      aud: "89a59610-32b9-0137-fc93-02561ff4456437548",
      exp: 1606988130,
      family_name: "Store",
      given_name: "Unmigrated",
      iat: 1606988070,
      iss: "https://loginppe.ourtesco.com/oidc/2",
      name: "Unmigrated Store",
      params: {
        employeeNumber: "UK99999727",
      },
      preferred_username: "a-uk99999727@dev.global.tesco.org",
      sid: "fefd3020-905c-4792-a315-9ed3e0d8b3aa",
      sub: "9589348",
      updated_at: 1606988067,
    });
  });

  it("returns undefined if no cookie is present", () => {
    const request = TypeMoq.Mock.ofType<express.Request>();

    const data = getDataFromCookie(request.object, {
      cookieName: "cookieName",
      secret: "foo bar",
      compressed: false,
    });
    expect(data).toEqual(undefined);
  });
});
