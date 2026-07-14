"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type OrderItem = {
  id: string;
  product_name: string;
  size: string;
  quantity: number;
  price: number;
};

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

export default function TrackOrderPage() {
  const [orderCode, setOrderCode] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);

  async function handleSearch() {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/order/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderCode,
          phone,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.error);
        return;
      }

      setOrder(json.order);
      setItems(json.items);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!order) return;

    if (
      !confirm(
        "Bạn có chắc muốn hủy đơn hàng này?"
      )
    ) {
      return;
    }

    try {
      setCancelLoading(true);

      const res = await fetch(
        "/api/order/cancel",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            orderId: order.id,
          }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        alert(json.error);
        return;
      }

      alert("Đã hủy đơn.");

      await handleSearch();

    } finally {
      setCancelLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pt-32 pb-24 text-white">

        <div className="mx-auto max-w-4xl">

          <h1 className="mb-12 text-center text-4xl font-bold uppercase">
            Tra cứu đơn hàng
          </h1>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">

            <div className="space-y-5">

              <input
                placeholder="Mã đơn"
                value={orderCode}
                onChange={(e) =>
                  setOrderCode(
                    e.target.value
                  )
                }
                className="h-14 w-full rounded-xl border border-white/10 bg-transparent px-4"
              />

              <input
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="h-14 w-full rounded-xl border border-white/10 bg-transparent px-4"
              />

              <button
                onClick={handleSearch}
                disabled={loading}
                className="h-14 w-full rounded-xl border border-white hover:bg-white hover:text-black"
              >
                {loading
                  ? "Đang tra cứu..."
                  : "Tra cứu"}
              </button>

            </div>

          </div>

          {order && (

            <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-950 p-8">

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                  {order.order_code}
                </h2>

                {(order.status ===
                  "Mới" ||
                  order.status ===
                    "Đang xử lý") && (

                  <button
                    onClick={
                      handleCancel
                    }
                    disabled={
                      cancelLoading
                    }
                    className="rounded-xl border border-red-500 px-5 py-3 text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    {cancelLoading
                      ? "Đang hủy..."
                      : "HỦY ĐƠN"}
                  </button>

                )}

              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">

                <div>

                  <p>
                    <strong>
                      Khách:
                    </strong>{" "}
                    {
                      order.customer_name
                    }
                  </p>

                  <p>
                    <strong>
                      SĐT:
                    </strong>{" "}
                    {order.phone}
                  </p>

                  <p>
                    <strong>
                      Trạng thái:
                    </strong>{" "}
                    {order.status}
                  </p>

                </div>

                <div>

                  {items.map(
                    (item) => (

                      <div
                        key={
                          item.id
                        }
                        className="mb-4 border-b border-white/10 pb-4"
                      >
                        <p>
                          {
                            item.product_name
                          }
                        </p>

                        <p>
                          Size{" "}
                          {
                            item.size
                          }
                        </p>

                        <p>
                          SL{" "}
                          {
                            item.quantity
                          }
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

              <div className="mt-8 border-t border-white/10 pt-6">

                <div className="flex justify-between">

                  <span>
                    Tổng
                  </span>

                  <strong>
                    {order.total.toLocaleString(
                      "vi-VN"
                    )}
                    ₫
                  </strong>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>

      <Footer />
    </>
  );
}