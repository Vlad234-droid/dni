import { encrypt, decrypt } from "./encryption";

describe("encrypt", () => {
  it("returns the same object it was passed", () => {
    const testObject = {
      id: 1,
    };
    const encrypted = encrypt("", testObject);
    expect(encrypted).toEqual({ id: 1 });
  });
});

describe("decrypt", () => {
  const testObject = {
    id: 1,
  };
  it("returns decrypted object", () => {
    const decrypted = JSON.parse(
      decrypt("foo bar", "U2FsdGVkX19t06r+0EpwVt7+Lb5GxABmvZOfBC/7bg0="),
    );
    expect(decrypted).toEqual(testObject);
  });

  it("returns the same object it was passed", () => {
    const decrypted = JSON.parse(decrypt("", '{"id":1}'));
    expect(decrypted).toEqual(testObject);
  });
});
