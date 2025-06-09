import { notoSansThai } from "@/config/fonts";
import { theme, type ThemeConfig } from "antd";

const { compactAlgorithm } = theme;

export const themeConfig: ThemeConfig = {
  algorithm: [compactAlgorithm],
  token: {
    fontSize: 14,
    colorPrimary: "#EA7F2F",
    fontFamily: notoSansThai.style.fontFamily,
    colorLink: "#EA7F2F",
  },
};
