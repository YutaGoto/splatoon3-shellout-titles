type SearchBoxProps = {
  searchText: string;
};

export const SearchBox = ({ searchText }: SearchBoxProps) => {
  return (
    <div class="flex items-center justify-center py-4">
      <form>
        <input
          type="text"
          name="q"
          class="px-4 py-2 border-2 border-[#603bff] rounded-lg"
          placeholder="イカ"
          value={searchText}
        />
        <button class="px-4 py-2 bg-[#603bff] text-white rounded-lg">
          検索
        </button>
      </form>
    </div>
  );
};
