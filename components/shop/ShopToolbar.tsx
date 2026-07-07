"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  categories: string[];

  sort: string;
  setSort: (value: string) => void;
};

export default function ShopToolbar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  sort,
  setSort,
}: Props) {
  return (
    <section className="my-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full border border-zinc-700 bg-transparent px-4 text-sm outline-none placeholder:text-zinc-600 lg:w-72"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 border border-zinc-700 bg-black px-4 text-sm outline-none"
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Right */}

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="h-12 border border-zinc-700 bg-black px-4 text-sm outline-none"
      >
        <option value="newest">
          Newest
        </option>

        <option value="low">
          Price: Low to High
        </option>

        <option value="high">
          Price: High to Low
        </option>

      </select>

    </section>
  );
}