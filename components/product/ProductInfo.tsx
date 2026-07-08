"use client";

import { useState } from "react";

import { Product } from "@/data/products";
import { useCartStore } from "@/lib/store/cartStore";

import Toast from "@/components/ui/Toast";

import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import SizeGuide from "./SizeGuide";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const [showToast, setShowToast] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: selectedSize,
      quantity,
    });

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <>
      <div className="flex flex-col">

        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 md:text-sm md:tracking-[0.3em]">
          {product.category}
        </p>

        <h1 className="mt-3 text-3xl font-bold uppercase leading-tight md:text-5xl">
          {product.name}
        </h1>

        <div className="mt-5 flex items-center gap-2">
          <span className="text-base text-yellow-400 md:text-lg">
            ★★★★★
          </span>

          <span className="text-xs text-zinc-500 md:text-sm">
            (12 Reviews)
          </span>
        </div>

        <p className="mt-6 text-2xl font-semibold md:mt-8 md:text-3xl">
          {product.price.toLocaleString("vi-VN")}₫
        </p>

        <p className="mt-6 text-sm leading-7 text-zinc-400 md:mt-8 md:text-base md:leading-8">
          {product.description}
        </p>

        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
        />

        <button
          onClick={() => setShowSizeGuide(true)}
          className="
            mt-4
            self-start
            text-xs
            uppercase
            tracking-[0.25em]
            text-zinc-500
            transition
            hover:text-white
          "
        >
          View Size Guide
        </button>

        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((prev) => prev + 1)}
          onDecrease={() =>
            setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
          }
        />

        <button
          onClick={handleAddToCart}
          className="
            mt-8
            h-14
            w-full
            border
            border-white
            text-sm
            font-semibold
            uppercase
            tracking-[0.25em]
            transition
            hover:bg-white
            hover:text-black
            md:mt-10
          "
        >
          Add to Cart
        </button>

        {/* TEST BUTTON */}

        <button
          onClick={() => alert("TEST BUTTON WORKS")}
          className="
            mt-4
            h-14
            w-full
            bg-red-600
            text-sm
            font-bold
            uppercase
            tracking-[0.2em]
            text-white
          "
        >
          TEST BUTTON
        </button>

        <div className="mt-12 border-t border-zinc-800 pt-8">

          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.3em]">
            Details
          </h3>

          <ul className="space-y-3 text-sm leading-7 text-zinc-500">
            <li>• {product.material}</li>
            <li>• {product.gsm} GSM</li>
            <li>• {product.fit}</li>
            <li>• Screen Printed Graphic</li>
            <li>• Made in Vietnam</li>
          </ul>

        </div>

        <div className="mt-10 border-t border-zinc-800 pt-8">

          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.3em]">
            Shipping & Returns
          </h3>

          <p className="text-sm leading-7 text-zinc-500">
            Orders are processed within 1–3 business days.
            <br />
            Worldwide shipping available.
            <br />
            Returns accepted within 7 days after delivery.
          </p>

        </div>

      </div>

      <SizeGuide
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <Toast
        show={showToast}
        image={product.images[0]}
        title={product.name}
        size={selectedSize}
        price={product.price}
      />
    </>
  );
}