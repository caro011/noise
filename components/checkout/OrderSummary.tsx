"use client";

import Image from "next/image";

import { CartItem } from "@/lib/store/cartStore";

type Props = {
  items: CartItem[];
  subtotal: number;
  onPlaceOrder: () => void;
  loading: boolean;
};

export default function OrderSummary({
  items,
  subtotal,
  onPlaceOrder,
  loading,
}: Props) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-zinc-950 p-6 lg:sticky lg:top-28">

      <h2 className="mb-8 text-xl font-bold uppercase tracking-[0.15em]">
        Đơn hàng
      </h2>

      <div className="space-y-6">

        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex gap-4 border-b border-white/10 pb-5"
          >
            <div className="relative h-24 w-20 overflow-hidden rounded-lg border border-white/10">

              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />

            </div>

            <div className="flex flex-1 flex-col justify-between">

              <div>

                <h3 className="font-semibold uppercase">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Size: {item.size}
                </p>

                <p className="text-sm text-zinc-500">
                  SL: {item.quantity}
                </p>

              </div>

              <p className="font-semibold">
                {(item.price * item.quantity).toLocaleString("vi-VN")}₫
              </p>

            </div>

          </div>
        ))}

      </div>

      <div className="mt-8 space-y-4 border-t border-white/10 pt-6">

        <div className="flex justify-between text-zinc-400">

          <span>Tạm tính</span>

          <span>{subtotal.toLocaleString("vi-VN")}₫</span>

        </div>

        <div className="flex justify-between text-zinc-400">

          <span>Phí vận chuyển</span>

          <span>Sẽ báo sau</span>

        </div>

        <div className="flex justify-between border-t border-white/10 pt-5 text-lg font-bold">

          <span>Tổng</span>

          <span>{subtotal.toLocaleString("vi-VN")}₫</span>

        </div>

      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={loading}
        className="mt-8 h-14 w-full rounded-xl border border-white text-sm font-semibold uppercase tracking-[0.25em] transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "ĐANG TẠO ĐƠN..." : "ĐẶT HÀNG"}
      </button>

      <p className="mt-5 text-center text-xs leading-6 text-zinc-500">
        Sau khi đặt hàng, NOISE sẽ liên hệ để xác nhận đơn và báo phí vận chuyển.
      </p>

    </aside>
  );
}