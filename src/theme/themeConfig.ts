import { type ThemeConfig } from "antd";
import { Noto_Sans_Thai } from "next/font/google";

export const notoSansThai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// const { darkAlgorithm, compactAlgorithm } = theme;

export const themeConfig: ThemeConfig = {
  // algorithm: [darkAlgorithm, compactAlgorithm],
  token: {
    fontSize: 14,
    colorPrimary: "#EA7F2F",
    fontFamily: notoSansThai.style.fontFamily,
    colorLink: "#EA7F2F",
  },
};
