"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabase/client";

type Order = {
  id: string;
  order_code: string;

  customer_name: string;
  phone: string;

  total: number | null;

  payment_method: string;
  payment_status: string;

  status: string;

  cancelled_by: string | null;
  cancelled_at: string | null;

  created_at: string | null;
};

export default function AdminOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function loadOrders() {
    setLoading(true);

    const ok = await checkLogin();

    if (!ok) return;

    try {
      const res = await fetch("/api/admin/orders");

      const json = await res.json();

      console.log("========== ADMIN ORDERS ==========");
      console.log(json);
      console.log("TOTAL:", json.orders?.length);
      console.log("FIRST:", json.orders?.[0]);

      if (json.success) {
        setOrders(json.orders ?? []);
      }
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  async function updateStatus(id: string, status: string) {
    await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id);

    loadOrders();
  }

  async function updatePaymentStatus(
    id: string,
    paymentStatus: string
  ) {
    await supabase
      .from("orders")
      .update({
        payment_status: paymentStatus,
      })
      .eq("id", id);

    loadOrders();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pb-24 pt-32 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex items-center justify-between">
            <h1 className="text-4xl font-bold uppercase">
              Quản lý đơn hàng
            </h1>

            <button
              onClick={logout}
              className="rounded-lg border border-white px-5 py-3 text-sm uppercase transition hover:bg-white hover:text-black"
            >
              Đăng xuất
            </button>
          </div>

          {!loading && (
            <div className="mb-6 rounded-lg border border-yellow-500 bg-yellow-500/10 p-4 text-yellow-300">
              Orders loaded: <b>{orders.length}</b>
            </div>
          )}

          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10">

              <table className="w-full">

                <thead className="bg-zinc-950">
                  <tr>
                    <th className="p-5 text-left">Mã đơn</th>
                    <th className="text-left">Khách</th>
                    <th className="text-left">SĐT</th>
                    <th className="text-left">Tổng</th>
                    <th className="text-left">Thanh toán</th>
                    <th className="text-left">TT Thanh toán</th>
                    <th className="text-left">TT Đơn</th>
                    <th className="text-left">Ngày</th>
                    <th className="text-left">Chi tiết</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="p-10 text-center text-zinc-500"
                      >
                        Không có đơn hàng
                      </td>
                    </tr>
                  )}

                  {orders.map((order) => {

                    console.log("RENDER:", order);

                    return (
                      <tr
                        key={order.id}
                        className="border-t border-white/10"
                      >
                        <td className="p-5">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="font-semibold hover:text-zinc-400"
                          >
                            {order.order_code}
                          </Link>
                        </td>

                        <td>{order.customer_name ?? "-"}</td>

                        <td>{order.phone ?? "-"}</td>

                        <td>
                          {Number(order.total ?? 0).toLocaleString("vi-VN")}₫
                        </td>

                        <td>
                          {order.payment_method === "BANK_TRANSFER"
                            ? "🏦 Chuyển khoản"
                            : "📦 COD"}
                        </td>

                        <td>
                          <select
                            value={order.payment_status ?? ""}
                            onChange={(e) =>
                              updatePaymentStatus(
                                order.id,
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-white/20 bg-black px-3 py-2"
                          >
                            <option value="PENDING">
                              Chờ thanh toán
                            </option>

                            <option value="PAID">
                              Đã thanh toán
                            </option>

                            <option value="UNPAID">
                              Chưa thu tiền
                            </option>

                            <option value="RECEIVED">
                              Đã thu tiền
                            </option>

                            <option value="REFUND_PENDING">
                              Chờ hoàn tiền
                            </option>
                          </select>
                        </td>

                        <td>
                          <select
                            value={order.status ?? ""}
                            onChange={(e) =>
                              updateStatus(
                                order.id,
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-white/20 bg-black px-3 py-2"
                          >
                            <option>Mới</option>
                            <option>Đang xử lý</option>
                            <option>Đang giao</option>
                            <option>Hoàn thành</option>
                            <option>Đã hủy</option>
                          </select>
                        </td>

                        <td>
                          {order.created_at
                            ? new Date(
                                order.created_at
                              ).toLocaleDateString("vi-VN")
                            : "-"}
                        </td>

                        <td>
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="rounded-lg border border-white px-4 py-2 text-sm transition hover:bg-white hover:text-black"
                          >
                            Xem
                          </Link>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}