import { TitleCard } from "../components/TitleCard.tsx";
import { TitleImage, titleImages } from "../constants/titleImages.ts";
import { SearchBox } from "../components/SearchBox.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import IconBrandGithub from "$tabler_icons/brand-github.tsx";

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
    <div class="px-4 py-8 mx-auto bg-purple">
      <div class="max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold text-yellow">
          Splatoon3 ランダム二つ名
        </h1>

        <SearchBox searchText={query} />

        <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mt-4">
          {results.map((titleImage) => {
            return (
              <TitleCard titleImage={titleImage} key={titleImage.filename} />
            );
          })}
        </div>

        <div class="mt-4">
          <a
            href="https://github.com/YutaGoto/splatoon3-shellout-titles"
            target="_blank"
            rel="noopener noreferrer"
            class="text-yellow"
          >
            <IconBrandGithub class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
