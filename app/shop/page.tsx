"use client";

import { useMemo, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ProductCard from "@/components/shared/ProductCard";
import ShopToolbar from "@/components/shop/ShopToolbar";

import { products } from "@/data/products";

export default function ShopPage() {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("newest");

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((product) => product.category)),
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Sort
    switch (sort) {
      case "low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "high":
        result.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    return result;
  }, [search, category, sort]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-36 pb-24 text-white">
        <div className="mx-auto max-w-7xl px-8">

          {/* Header */}

          <section className="border-b border-zinc-800 pb-14">

            <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">
              Noise Collection
            </p>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h1 className="text-6xl font-bold uppercase">
                  Shop
                </h1>

                <p className="mt-5 max-w-xl leading-8 text-zinc-500">
                  Designed for those who grew up surrounded by noise.
                  Minimal pieces with bold identity.
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                  Products
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {filteredProducts.length}
                </p>
              </div>

            </div>

          </section>

          <ShopToolbar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
            sort={sort}
            setSort={setSort}
          />

          <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}