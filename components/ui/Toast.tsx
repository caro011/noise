"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  show: boolean;
  image: string;
  title: string;
  size: string;
  price: number;
};

export default function Toast({
  show,
  image,
  title,
  size,
  price,
}: Props) {
  return (
    <div
      className={`
        fixed
        bottom-6
        right-6
        z-[999]
        w-[340px]
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-zinc-950
        shadow-2xl
        transition-all
        duration-300
        ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        }
      `}
    >
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-white">
          ✓ Added to Cart
        </p>
      </div>

      <div className="flex gap-4 p-5">

        <Image
          src={image}
          alt={title}
          width={80}
          height={100}
          className="rounded-lg object-cover"
        />

        <div className="flex-1">

          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Size {size}
          </p>

          <p className="mt-3 font-semibold text-white">
            {price.toLocaleString("vi-VN")}₫
          </p>

        </div>

      </div>

      <div className="border-t border-white/10 p-4">

        <Link
          href="/cart"
          className="flex h-11 w-full items-center justify-center border border-white text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
        >
          View Cart
        </Link>

      </div>

    </div>
  );
}