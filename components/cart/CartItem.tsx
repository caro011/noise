"use client";

import Image from "next/image";

import { CartItem as Item } from "@/lib/store/cartStore";

type Props = {
  item: Item;

  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <div className="flex flex-col gap-5 border-b border-white/10 py-6 sm:flex-row">

      <div className="mx-auto sm:mx-0">
        <Image
          src={item.image}
          alt={item.name}
          width={140}
          height={170}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">

        <h2 className="text-xl font-semibold">
          {item.name}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Size {item.size}
        </p>

        <p className="mt-4 text-lg font-semibold">
          {item.price.toLocaleString("vi-VN")}₫
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">

          <button
            onClick={onDecrease}
            className="flex h-10 w-10 items-center justify-center border border-white transition hover:bg-white hover:text-black"
          >
            −
          </button>

          <span className="min-w-[24px] text-center">
            {item.quantity}
          </span>

          <button
            onClick={onIncrease}
            className="flex h-10 w-10 items-center justify-center border border-white transition hover:bg-white hover:text-black"
          >
            +
          </button>

          <button
            onClick={onRemove}
            className="ml-0 text-sm uppercase tracking-[0.2em] text-zinc-500 transition hover:text-white sm:ml-6"
          >
            Remove
          </button>

        </div>

      </div>

    </div>
  );
}