"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Menu, X, ShoppingBag } from "lucide-react";

import { useCartStore } from "@/lib/store/cartStore";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const items = useCartStore((state) => state.items);

  const totalQuantity = hasMounted
    ? items.reduce((total, item) => total + item.quantity, 0)
    : 0;

  useEffect(() => {
    setHasMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-8 lg:px-10 lg:py-6">

          <Link href="/">
            <Image
              src="/logo/logow.svg"
              alt="NOISE"
              width={140}
              height={40}
              className="h-auto w-24 md:w-28"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.3em] text-white md:flex">

            <Link
              href="/shop"
              className="transition hover:text-zinc-400"
            >
              Cửa hàng
            </Link>

            <a
              href="#lookbook"
              className="transition hover:text-zinc-400"
            >
              Lookbook
            </a>

            <a
              href="#about"
              className="transition hover:text-zinc-400"
            >
              Giới thiệu
            </a>

            <Link
              href="/cart"
              className="relative transition hover:text-zinc-400"
            >
              <ShoppingBag size={20} />

              {totalQuantity > 0 && (
                <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                  {totalQuantity}
                </span>
              )}
            </Link>

          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="relative z-[60] text-white md:hidden"
          >
            <Menu size={30} />
          </button>

        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          menuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        <div
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-black text-white shadow-2xl transition-transform duration-500 ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">

            <Image
              src="/logo/logow.svg"
              alt="NOISE"
              width={120}
              height={40}
            />

            <button
              onClick={() => setMenuOpen(false)}
              className="text-white transition duration-300 hover:rotate-90"
            >
              <X size={30} />
            </button>

          </div>

          <nav className="flex flex-1 flex-col justify-center px-8">

            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-6 text-2xl font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:pl-3"
            >
              Cửa hàng
            </Link>

            <a
              href="#lookbook"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-6 text-2xl font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:pl-3"
            >
              Lookbook
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-6 text-2xl font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:pl-3"
            >
              Giới thiệu
            </a>

            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-6 text-2xl font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:pl-3"
            >
              <span>Giỏ hàng</span>

              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-black">
                {totalQuantity}
              </span>
            </Link>

          </nav>

          <div className="border-t border-white/10 px-8 py-8">

            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Theo dõi
            </p>

            <div className="flex gap-6 text-sm uppercase tracking-[0.2em]">

              <a
                href="#"
                className="transition hover:text-zinc-400"
              >
                Instagram
              </a>

              <a
                href="#"
                className="transition hover:text-zinc-400"
              >
                TikTok
              </a>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}