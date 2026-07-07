import ProductCard from "@/components/shared/ProductCard";

import { products } from "@/data/products";

export default function NewArrival() {
  const newProducts = products.filter(
    (product) => product.newArrival
  );

  if (newProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-20 text-white md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-10">

        <div className="mb-10 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 md:text-xs md:tracking-[0.4em]">
            Latest Drop
          </p>

          <h2 className="mt-3 text-3xl font-bold uppercase md:mt-4 md:text-5xl">
            New Arrival
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>
    </section>
  );
}