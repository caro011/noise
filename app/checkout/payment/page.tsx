"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabase/client";
import { PAYMENT } from "@/lib/payment";
import { generateVietQR } from "@/lib/vietqr";

type Order = {
  id: string;
  order_code: string;
  customer_name: string;
  total: number;
};

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadOrder() {
      if (!id) {
        router.replace("/");
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("id,order_code,customer_name,total")
        .eq("id", id)
        .single();

      if (error || !data) {
        router.replace("/");
        return;
      }

      setOrder(data);
      setLoading(false);
    }

    loadOrder();
  }, [id, router]);

  if (loading || !order) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black flex items-center justify-center text-white">
          Đang tải...
        </main>

        <Footer />
      </>
    );
  }

  const qr = generateVietQR(
    PAYMENT.bankBin,
    PAYMENT.accountNumber,
    order.total,
    order.order_code
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pt-32 pb-24 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-8">

          <h1 className="text-center text-3xl font-bold uppercase">
            Thanh toán chuyển khoản
          </h1>

          <p className="mt-3 text-center text-zinc-500">
            Quét mã QR bằng ứng dụng ngân hàng
          </p>

          <div className="mt-10 flex justify-center">
            <Image
              src={qr}
              alt="VietQR"
              width={320}
              height={320}
              unoptimized
            />
          </div>

          <div className="mt-10 space-y-4 rounded-2xl border border-white/10 p-6">

            <div className="flex justify-between">
              <span className="text-zinc-500">Mã đơn</span>
              <span className="font-semibold">
                {order.order_code}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Ngân hàng</span>
              <span>{PAYMENT.bankName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Chủ tài khoản</span>
              <span>{PAYMENT.accountName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Số tài khoản</span>
              <span>{PAYMENT.accountNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Nội dung CK</span>
              <span className="font-semibold">
                {order.order_code}
              </span>
            </div>

            <div className="flex justify-between border-t border-white/10 pt-5 text-xl font-bold">
              <span>Tổng tiền</span>
              <span>
                {order.total.toLocaleString("vi-VN")}₫
              </span>
            </div>

          </div>

          <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm leading-7 text-yellow-300">
            Sau khi chuyển khoản thành công, đơn hàng sẽ được xác nhận trong thời gian sớm nhất.
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default function PaymentPage() {
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
      <PaymentContent />
    </Suspense>
  );
}