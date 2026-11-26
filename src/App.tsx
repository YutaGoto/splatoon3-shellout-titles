import { useEffect, useMemo, useState } from "react";
import { IconBrandGithub } from "@tabler/icons-react";
import { SearchBox } from "./components/SearchBox.tsx";
import { TitleCard } from "./components/TitleCard.tsx";
import { titleImages } from "./constants/titleImages.ts";

function getQueryFromUrl(): string {
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

function NotFound() {
  useEffect(() => {
    document.title = "404 - Page not found";
  }, []);

  return (
    <div className="px-4 py-8 mx-auto bg-[#86efac] min-h-screen">
      <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          className="my-6"
          src="/logo.svg"
          width={128}
          height={128}
          alt="logo"
        />
        <h1 className="text-4xl font-bold">404 - Page not found</h1>
        <p className="my-4">The page you were looking for doesn't exist.</p>
        <a href="/" className="underline">
          Go back home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState<string>(getQueryFromUrl);

  useEffect(() => {
    const onPopState = () => setQuery(getQueryFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const results = useMemo(() => {
    if (!query) return titleImages;
    return titleImages.filter((titleImage) => titleImage.title.includes(query));
  }, [query]);

  if (window.location.pathname !== "/") {
    return <NotFound />;
  }

  const handleSearch = (nextQuery: string) => {
    const url = new URL(window.location.href);
    if (nextQuery) {
      url.searchParams.set("q", nextQuery);
    } else {
      url.searchParams.delete("q");
    }
    window.history.pushState({}, "", url);
    setQuery(nextQuery);
  };

  return (
    <div className="px-4 py-8 mx-auto bg-purple min-h-screen">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-yellow">
          Splatoon3 ランダム二つ名
        </h1>

        <SearchBox searchText={query} onSearch={handleSearch} />

        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mt-4">
          {results.map((titleImage) => (
            <TitleCard titleImage={titleImage} key={titleImage.filename} />
          ))}
        </div>

        <div className="mt-4">
          <a
            href="https://github.com/YutaGoto/splatoon3-shellout-titles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow"
          >
            <IconBrandGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
