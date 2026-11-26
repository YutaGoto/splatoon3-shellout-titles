import type { TitleImage } from "../constants/titleImages.ts";

type TitleCardProps = {
  titleImage: TitleImage;
};

export const TitleCard = ({ titleImage }: TitleCardProps) => {
  return (
    <div className="bg-stone-900 shadow-md p-4 rounded-lg">
      <p className="text-xl text-slate-50 text-center font-bold mb-2">
        {titleImage.title}
      </p>
      <img
        src={`/titleImages/${titleImage.filename}`}
        alt={titleImage.title}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};
