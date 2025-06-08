import crypto from "crypto-js";

export const sha1 = (data: string) => {
  return crypto.SHA1(data).toString();
};

export const sha256 = (data: string) => {
  return crypto.SHA256(data).toString();
};
