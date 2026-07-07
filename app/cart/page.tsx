"use client";

import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

import { useCartStore } from "@/lib/store/cartStore";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCartStore();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-black px-6 pt-32 text-white">

          <div className="mx-auto max-w-md text-center">

            <h1 className="text-3xl font-bold uppercase md:text-5xl">
              Your Cart is Empty
            </h1>

            <p className="mt-6 text-zinc-500">
              Looks like you haven't added anything yet.
            </p>

            <Link
              href="/shop"
              className="mt-10 inline-flex h-14 items-center justify-center border border-white px-10 text-sm font-semibold uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
            >
              Continue Shopping
            </Link>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pb-20 pt-32 text-white md:px-8 lg:px-10 lg:pt-36">

        <div className="mx-auto max-w-7xl">

          <h1 className="mb-10 text-3xl font-bold uppercase md:mb-14 md:text-5xl">
            Cart
          </h1>

          <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">

            <div>

              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.size}`}
                  item={item}
                  onIncrease={() =>
                    increaseQuantity(item.id, item.size)
                  }
                  onDecrease={() =>
                    decreaseQuantity(item.id, item.size)
                  }
                  onRemove={() =>
                    removeItem(item.id, item.size)
                  }
                />
              ))}

            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <CartSummary subtotal={subtotal} />
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}