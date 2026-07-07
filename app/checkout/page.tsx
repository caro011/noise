"use client";

import { redirect } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { useCartStore } from "@/lib/store/cartStore";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    redirect("/cart");
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 30000;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pb-20 pt-32 text-white md:px-8 lg:px-10 lg:pt-36">

        <div className="mx-auto max-w-6xl">

          <h1 className="mb-12 text-3xl font-bold uppercase md:text-5xl">
            Checkout
          </h1>

          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">

            {/* Left */}

            <div className="space-y-10">

              <section>

                <h2 className="mb-6 text-xl font-semibold uppercase">
                  Contact
                </h2>

                <input
                  type="email"
                  placeholder="Email"
                  className="h-14 w-full border border-white/10 bg-transparent px-4 outline-none focus:border-white"
                />

              </section>

              <section>

                <h2 className="mb-6 text-xl font-semibold uppercase">
                  Shipping Address
                </h2>

                <div className="grid gap-4">

                  <input
                    placeholder="Full Name"
                    className="h-14 border border-white/10 bg-transparent px-4 outline-none focus:border-white"
                  />

                  <input
                    placeholder="Phone Number"
                    className="h-14 border border-white/10 bg-transparent px-4 outline-none focus:border-white"
                  />

                  <input
                    placeholder="Address"
                    className="h-14 border border-white/10 bg-transparent px-4 outline-none focus:border-white"
                  />

                  <input
                    placeholder="City"
                    className="h-14 border border-white/10 bg-transparent px-4 outline-none focus:border-white"
                  />

                </div>

              </section>

            </div>

            {/* Right */}

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 lg:sticky lg:top-28">

              <h2 className="mb-8 text-xl font-semibold uppercase">
                Order Summary
              </h2>

              <div className="space-y-6">

                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center justify-between border-b border-white/10 pb-4"
                  >
                    <div>

                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-zinc-500">
                        Size {item.size} × {item.quantity}
                      </p>

                    </div>

                    <span>
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </span>

                  </div>
                ))}

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Subtotal
                  </span>

                  <span>
                    {subtotal.toLocaleString("vi-VN")}₫
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Shipping
                  </span>

                  <span>
                    {shipping.toLocaleString("vi-VN")}₫
                  </span>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-6 text-lg font-semibold">

                  <span>Total</span>

                  <span>
                    {total.toLocaleString("vi-VN")}₫
                  </span>

                </div>

              </div>

              <button
                className="mt-10 h-14 w-full border border-white text-sm font-semibold uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
              >
                Place Order
              </button>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}