import { TitleCard } from "../components/TitleCard.tsx";
import { TitleImage, titleImages } from "../constants/titleImages.ts";
import { SearchBox } from "../components/SearchBox.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  results: TitleImage[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const results = titleImages.filter((titleImage) => {
      return titleImage.title.includes(query);
    });
    return ctx.render({ results, query });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { results, query } = data;

  return (
    <div class="px-4 py-8 mx-auto bg-[#603bff]">
      <div class="max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold text-[#eaff3d]">
          Splatoon3 ランダム二つ名
        </h1>

        <SearchBox searchText={query} />

        <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mt-4">
          {results.map((titleImage) => {
            return <TitleCard titleImage={titleImage} />;
          })}
        </div>
      </div>
    </div>
  );
}
