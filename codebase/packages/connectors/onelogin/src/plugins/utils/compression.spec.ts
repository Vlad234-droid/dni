import { compress, decompress } from "./compression";

describe("compress", () => {
  const testObject = {
    id: 1,
  };
  it("returns encoded object", () => {
    const encoded = compress(true, testObject);
    expect(encoded).toEqual("iwOAeyJpZCI6MX0D");
  });

  it("returns the same object it was passed", () => {
    const encoded = compress(false, testObject);
    expect(encoded).toEqual({ id: 1 });
  });
});

describe("decompress", () => {
  const testObject = '{"id":1}';
  it("returns docoded object", () => {
    const encoded = decompress(true, "iwOAeyJpZCI6MX0D");
    expect(encoded).toEqual(testObject);
  });

  it("returns the same object it was passed", () => {
    const encoded = decompress(false, '{"id":1}');
    expect(encoded).toEqual(testObject);
  });
});
