"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load menu dishes.");
  }

  return response.json();
};

export default function MenuBrowser({ initialDishes }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  const key =
    debouncedSearch.length > 0
      ? `/api/dishes?q=${encodeURIComponent(debouncedSearch)}`
      : "/api/dishes?q=";

  const { data, error, isLoading } = useSWR(key, fetcher, {
    fallbackData: initialDishes,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const dishes = data || [];

  return (
    <section>
      <label
        htmlFor="dish-search"
        className="mb-2 block font-semibold text-gray-800"
      >
        Search dishes
      </label>

      <input
        id="dish-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search Doro Wot, Tibs, or Vegetarian..."
        className="mb-3 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
      />

      <p className="mb-6 text-sm text-gray-500">
        Search by dish name, description, or category.
      </p>

      {error && (
        <p role="alert" className="mb-4 text-red-700">
          Could not refresh the menu. Please try again.
        </p>
      )}

      {isLoading && (
        <p className="mb-4 text-sm text-gray-500">Loading dishes...</p>
      )}

      {dishes.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold">No dishes found</h2>
          <p className="mt-2 text-gray-600">
            Try another dish name or search term.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <article
              key={dish.id}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-32 items-center justify-center rounded-xl bg-orange-100 text-6xl">
                🍲
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold">{dish.name}</h2>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                  ★ {dish.rating}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {dish.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-bold text-orange-700">
                  {dish.price} ETB
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  {dish.category}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-gray-500" aria-live="polite">
        Showing {dishes.length} {dishes.length === 1 ? "dish" : "dishes"}.
      </p>
    </section>
  );
}