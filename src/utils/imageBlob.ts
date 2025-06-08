import { imageToken } from "@/utils/imageToken";

export const imageBlob = async (src: string) => {
  try {
    const url = imageToken(src);

    const response = await fetch(url);

    if (!response.ok) {
      return "";
    }

    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);

    return objectURL;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
};
