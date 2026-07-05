"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-10 py-6">
        <Image
          src="/logo/logow.svg"
          alt="NOISE"
          width={140}
          height={40}
          className="h-auto w-28"
        />

        <nav className="flex gap-10 text-xs uppercase tracking-[0.3em]">
          <a href="#" className="hover:text-zinc-400 transition">
            Shop
          </a>

          <a href="#" className="hover:text-zinc-400 transition">
            Lookbook
          </a>

          <a href="#" className="hover:text-zinc-400 transition">
            About
          </a>

          <a href="#" className="hover:text-zinc-400 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}