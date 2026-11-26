import { useEffect, useState, type FormEvent } from "react";

type SearchBoxProps = {
  searchText: string;
  onSearch: (query: string) => void;
};

export const SearchBox = ({ searchText, onSearch }: SearchBoxProps) => {
  const [input, setInput] = useState(searchText);

  useEffect(() => {
    setInput(searchText);
  }, [searchText]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(input);
  };

  return (
    <div className="flex items-center justify-center py-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="q"
          className="px-4 py-2 border-2 border-purple rounded-lg bg-white text-black"
          placeholder="イカ"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-purple text-white rounded-lg"
          type="submit"
        >
          検索
        </button>
      </form>
    </div>
  );
};
