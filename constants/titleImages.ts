import titleImagesData from "../static/titleImages.json" with { type: "json" };

export interface TitleImage {
  filename: string;
  title: string;
}

export const titleImages: TitleImage[] = titleImagesData;
