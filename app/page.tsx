import Image from "next/image";

import Navbar from "@/components/layout/Navbar";

import Featured from "@/components/home/Featured";
import Campaign from "@/components/home/Campaign";
import Lookbook from "@/components/home/Lookbook";
import Manifesto from "@/components/home/Manifesto";

import NewArrival from "@/components/sections/NewArrival";

import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 md:pt-0">

          <Image
            src="/logo/logow.svg"
            alt="NOISE"
            width={1300}
            height={220}
            priority
            className="h-auto w-full max-w-[320px] select-none sm:max-w-[500px] md:max-w-[700px] lg:max-w-[1100px]"
          />

          <p className="mt-8 max-w-md px-4 text-center text-xs uppercase tracking-[0.25em] text-zinc-500 sm:text-sm sm:tracking-[0.35em] lg:max-w-xl lg:tracking-[0.45em]">
            From Chaos, Noise Rises.
          </p>

          <button className="mt-10 border border-white px-7 py-3 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black sm:px-10 sm:py-4 sm:text-xs sm:tracking-[0.35em]">
            Shop Now
          </button>

          <div className="absolute bottom-6 animate-bounce text-zinc-600 md:bottom-10">
            ↓
          </div>

        </section>

        <Featured />

        <Campaign />

        <NewArrival />

        <Lookbook />

        <Manifesto />

        <Footer />

      </main>
    </>
  );
}