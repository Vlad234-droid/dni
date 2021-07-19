import cryptoJS from "crypto-js";
import { curry2 } from "@energon/function-utils";

type Decrypt = {
  <T>(secret: string, data: T): T;
  <T>(secret: string): (data: T) => T;
};
export const decrypt: Decrypt = curry2((secret, data) =>
  secret && typeof data === "string"
    ? cryptoJS.AES.decrypt(data, secret).toString(cryptoJS.enc.Utf8)
    : data,
);

type Encrypt = {
  <T>(secret: string, encryptedData: T): T | string;
  <T>(secret: string): (encryptedData: T) => T | string;
};
export const encrypt: Encrypt = curry2((secret, encryptedData) =>
  secret
    ? cryptoJS.AES.encrypt(JSON.stringify(encryptedData), secret).toString()
    : encryptedData,
);
