type TitleCardProps = {
  titleImage: {
    filename: string;
    title: string;
  };
};

export const TitleCard = ({ titleImage }: TitleCardProps) => {
  return (
    <div class="bg-stone-900 shadow-md p-4 rounded-lg">
      <p class="text-xl text-slate-50 text-center font-bold mb-2">
        {titleImage.title}
      </p>
      <img
        src={`/titleImages/${titleImage.filename}`}
        alt={titleImage.title}
      />
    </div>
  );
};
