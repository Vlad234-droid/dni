import { getMaxAge } from "./get-max-age";

describe("get max age from claim", () => {
  const mockDate = (expected: Date) => {
    const MockDate = () => {
      return new _Date(expected);
    };
    global.Date = MockDate as any;
  };

  const _Date = Date;

  beforeEach(() => {
    const timeFreeze = new Date("2019-10-01T00:00:01.30Z");
    mockDate(timeFreeze);
  });
  afterEach(() => {
    global.Date = _Date;
  });

  it("returns correct maxAge for given expiration claim", () => {
    const correctClaim = { exp: 10000000000 };

    const maxAge = getMaxAge(correctClaim);
    expect(maxAge).toEqual(8430111998700);
  });

  it("returns 0 for 0 exp claim", () => {
    const maxAge = getMaxAge({ exp: 0 });
    expect(maxAge).toEqual(0);
  });

  it("returns 0 for empty exp claim", () => {
    const maxAge = getMaxAge({} as any);
    expect(maxAge).toEqual(0);
  });

  it("returns 0 for claim with incorrect", () => {
    const incorrectValueClaim = {
      exp: "undefined",
    };

    const maxAge = getMaxAge(incorrectValueClaim as any);
    expect(maxAge).toEqual(0);
  });
});
