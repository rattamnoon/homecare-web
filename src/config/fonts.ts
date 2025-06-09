import { Noto_Sans_Thai } from "next/font/google";

export const notoSansThai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
