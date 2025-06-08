import dayjs from "dayjs";

import { sha1 } from "./sha";

export const imageToken = (file: string) => {
  const hash = sha1(dayjs().format("DDMMYYYYHH"));

  // Fixed token for testing "xxxxxx"
  return `${file}?token=${hash}`;
};

export default imageToken;
