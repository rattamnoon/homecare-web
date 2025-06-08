import type { ThemeConfig } from "antd";
import { Noto_Sans_Thai } from "next/font/google";

export const notoSansThai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme: ThemeConfig = {
  components: {
    Menu: {
      itemSelectedBg: "#FFF5F4",
    },
    Button: {
      primaryShadow: "0px",
    },
    Select: {
      optionSelectedBg: "#FFF5F4",
    },
    Calendar: {
      borderRadiusSM: 15,
    },
  },
  token: {
    fontSize: 14,
    fontFamily: notoSansThai.style.fontFamily,
    colorPrimary: "#EA7F2F",
    colorLink: "#EA7F2F",
    marginLG: 16,
  },
};

export default theme;
