import titleImagesData from "../../static/titleImages.json";

export interface TitleImage {
  filename: string;
  title: string;
}

export const titleImages: TitleImage[] = titleImagesData;
