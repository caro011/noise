import ProductCard from "@/components/shared/ProductCard";

import { products } from "@/data/products";

type Props = {
  currentSlug: string;
};

export default function RelatedProducts({
  currentSlug,
}: Props) {
  const relatedProducts = products
    .filter((product) => product.slug !== currentSlug)
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-32 border-t border-zinc-800 pt-20">

      <div className="mb-14">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          You May Also Like
        </p>

        <h2 className="mt-3 text-4xl font-bold uppercase">
          Related Products
        </h2>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}