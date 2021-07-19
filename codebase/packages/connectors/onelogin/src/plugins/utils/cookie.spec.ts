import express from "express";
import * as TypeMoq from "typemoq";
import { setDataToCookie, clearCookie, clearRequestCookie } from "./cookie";

describe("set data to cookie", () => {
  it("sets correct data to the specified cookie", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();

    response
      .setup((x) =>
        x.cookie(
          TypeMoq.It.isValue("cookieName"),
          TypeMoq.It.isAnyString(),
          TypeMoq.It.isValue({
            httpOnly: true,
            signed: true,
            secure: false,
            maxAge: 600000,
            path: "/",
          }),
        ),
      )
      .verifiable(TypeMoq.Times.exactly(1));

    setDataToCookie(
      response.object,
      { data: "data" },
      { cookieName: "cookieName", secret: "foo bar", maxAge: 600000 },
    );

    response.verifyAll();
  });
});

describe("clear cookie", () => {
  it("clears specified cookie", () => {
    const response = TypeMoq.Mock.ofType<express.Response>();

    response
      .setup((x) =>
        x.clearCookie(
          TypeMoq.It.isValue("cookieName"),
          TypeMoq.It.isValue({
            httpOnly: true,
            signed: true,
            secure: false,
            path: "/",
          }),
        ),
      )
      .verifiable(TypeMoq.Times.exactly(1));

    clearCookie(response.object, {
      cookieName: "cookieName",
    });

    response.verifyAll();
  });
});

describe("clear request cookie", () => {
  const request = ({
    cookies: {
      cookieName: "sweet cookie",
    },
    signedCookies: {
      cookieName: "sweet cookie",
    },
  } as any) as express.Request;

  clearRequestCookie(request, { cookieName: "cookieName" });

  expect(request.cookies).toEqual({});
  expect(request.signedCookies).toEqual({});
});
