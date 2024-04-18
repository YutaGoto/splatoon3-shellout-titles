import { TitleCard } from "../components/TitleCard.tsx";
import { titleImages } from "../constants/titleImages.ts";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#603bff]">
      <div class="max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <h1 class="md:text-4xl sm:text-3xl font-bold text-[#eaff3d]">
          Splatoon3 ランダム二つ名
        </h1>

        <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mt-4">
          {titleImages.map((titleImage) => {
            return <TitleCard titleImage={titleImage} />;
          })}
        </div>
      </div>
    </div>
  );
}
