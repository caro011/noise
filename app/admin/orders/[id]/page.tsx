"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabase/client";

type Order = {
  id: string;

  order_code: string;

  customer_name: string;
  phone: string;
  email: string;

  province: string;
  district: string;
  ward: string;
  address: string;

  note: string;

  subtotal: number;
  shipping: number;
  total: number;

  payment_method: string;
  payment_status: string;

  status: string;

  created_at: string;
};

type OrderItem = {
  id: string;

  product_name: string;

  size: string;

  quantity: number;

  price: number;
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState<Order | null>(null);

  const [items, setItems] = useState<OrderItem[]>([]);

  async function checkLogin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/admin/login");
      return false;
    }

    return true;
  }

  async function loadOrder() {
    setLoading(true);

    const ok = await checkLogin();

    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/orders/${id}`);

      const json = await res.json();

      console.log("ORDER DETAIL:", json);

      if (json.success) {
        setOrder(json.order);
        setItems(json.items);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOrder();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black pt-32 text-center text-white">
          Đang tải...
        </main>

        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black pt-32 text-center text-white">
          Không tìm thấy đơn hàng.
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pb-24 pt-32 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 flex items-center justify-between">

            <h1 className="text-4xl font-bold uppercase">
              {order.order_code}
            </h1>

            <button
              onClick={() => router.push("/admin/orders")}
              className="rounded-lg border border-white px-5 py-3 transition hover:bg-white hover:text-black"
            >
              ← Quay lại
            </button>

          </div>

          <div className="grid gap-10 lg:grid-cols-2">

            <div className="rounded-2xl border border-white/10 p-8">

              <h2 className="mb-6 text-xl font-semibold">
                Thông tin khách hàng
              </h2>

              <div className="space-y-4 text-zinc-300">

                <p>
                  <strong>Họ tên:</strong>{" "}
                  {order.customer_name}
                </p>

                <p>
                  <strong>SĐT:</strong>{" "}
                  {order.phone}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.email || "-"}
                </p>

                <p>
                  <strong>Địa chỉ:</strong>
                  <br />
                  {order.address}
                  <br />
                  {order.ward}
                  <br />
                  {order.district}
                  <br />
                  {order.province}
                </p>

                <p>
                  <strong>Thanh toán:</strong>{" "}
                  {order.payment_method === "BANK_TRANSFER"
                    ? "🏦 Chuyển khoản"
                    : "📦 COD"}
                </p>

                <p>
                  <strong>TT thanh toán:</strong>{" "}
                  {order.payment_status}
                </p>

                <p>
                  <strong>TT đơn:</strong>{" "}
                  {order.status}
                </p>

                <p>
                  <strong>Ghi chú:</strong>
                  <br />
                  {order.note || "Không có"}
                </p>

              </div>

            </div>

            <div className="rounded-2xl border border-white/10 p-8">

              <h2 className="mb-6 text-xl font-semibold">
                Sản phẩm
              </h2>

              <div className="space-y-5">

                {items.map((item) => (

                  <div
                    key={item.id}
                    className="border-b border-white/10 pb-5"
                  >

                    <p className="font-semibold">
                      {item.product_name}
                    </p>

                    <p className="text-zinc-500">
                      Size: {item.size}
                    </p>

                    <p className="text-zinc-500">
                      SL: {item.quantity}
                    </p>

                    <p className="font-semibold">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>

                    <p className="text-lg font-bold">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </p>

                  </div>

                ))}

              </div>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">

                <div className="flex justify-between">
                  <span>Tạm tính</span>

                  <span>
                    {order.subtotal.toLocaleString("vi-VN")}₫
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Phí ship</span>

                  <span>
                    {order.shipping.toLocaleString("vi-VN")}₫
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold">

                  <span>Tổng cộng</span>

                  <span>
                    {order.total.toLocaleString("vi-VN")}₫
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}