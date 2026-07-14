"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const orderCode = searchParams.get("code");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pb-24 pt-32 text-white md:px-8 lg:px-10 lg:pt-40">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 p-10 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-green-500 text-5xl">
            ✓
          </div>

          <h1 className="mt-8 text-4xl font-bold uppercase tracking-[0.15em]">
            Đặt hàng thành công
          </h1>

          <p className="mt-6 leading-8 text-zinc-400">
            Cảm ơn bạn đã mua hàng tại
            <span className="font-semibold text-white"> NOISE.</span>
            <br />
            Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng trong thời gian sớm nhất.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-black p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Mã đơn hàng
            </p>

            <p className="mt-4 text-3xl font-bold tracking-[0.15em]">
              {orderCode}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Link
              href="/shop"
              className="flex h-14 items-center justify-center rounded-xl border border-white text-sm font-semibold uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
            >
              Tiếp tục mua
            </Link>

            <Link
              href="/"
              className="flex h-14 items-center justify-center rounded-xl border border-white/20 text-sm font-semibold uppercase tracking-[0.25em] transition hover:border-white"
            >
              Về trang chủ
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="min-h-screen bg-black flex items-center justify-center text-white">
            Đang tải...
          </main>
          <Footer />
        </>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}