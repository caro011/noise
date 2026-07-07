"use client";

import Link from "next/link";

type Props = {
  subtotal: number;
};

export default function CartSummary({
  subtotal,
}: Props) {
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 lg:sticky lg:top-28">

      <h2 className="mb-8 text-2xl font-semibold uppercase">
        Order Summary
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Subtotal
          </span>

          <span className="font-medium">
            {subtotal.toLocaleString("vi-VN")}₫
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Shipping
          </span>

          <span className="font-medium">
            {shipping.toLocaleString("vi-VN")}₫
          </span>
        </div>

        <div className="border-t border-white/10 pt-5">

          <div className="flex items-center justify-between">

            <span className="text-lg font-semibold">
              Total
            </span>

            <span className="text-xl font-bold">
              {total.toLocaleString("vi-VN")}₫
            </span>

          </div>

        </div>

      </div>

      <Link
        href="/checkout"
        className="
          mt-8
          flex
          h-14
          w-full
          items-center
          justify-center
          border
          border-white
          text-sm
          font-semibold
          uppercase
          tracking-[0.25em]
          transition
          hover:bg-white
          hover:text-black
        "
      >
        Checkout
      </Link>

    </div>
  );
}