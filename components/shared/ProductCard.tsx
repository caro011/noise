import Image from "next/image";
import Link from "next/link";

import { Product } from "@/data/products";
import { formatPrice } from "@/utils/format";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="overflow-hidden bg-zinc-900">

        <Image
          src={product.images[0]}
          alt={product.name}
          width={700}
          height={900}
          className="aspect-[4/5] h-auto w-full object-cover transition duration-500 group-hover:scale-105"
        />

      </div>

      <div className="mt-5">

        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          {product.category}
        </p>

        <h3 className="mt-2 text-xl font-semibold uppercase transition group-hover:text-zinc-400">
          {product.name}
        </h3>

        <p className="mt-4 text-lg font-medium">
          {formatPrice(product.price)}
        </p>

      </div>
    </Link>
  );
}