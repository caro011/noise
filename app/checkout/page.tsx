"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";

import { useCartStore } from "@/lib/store/cartStore";
import { createOrder } from "@/lib/supabase/order";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<
    "BANK_TRANSFER" | "COD"
  >("BANK_TRANSFER");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");

  const [note, setNote] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("Checkout đang dùng API /api/orders");
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [mounted, items, router]);

  if (!mounted) {
    return null;
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (loading) return;

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !province.trim() ||
      !district.trim() ||
      !ward.trim() ||
      !address.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      setLoading(true);

      const order = await createOrder({
        customerName: fullName,
        phone,
        email,

        province,
        district,
        ward,
        address,

        note,

        paymentMethod,

        items,
      });

      if (email.trim()) {
        try {
          await fetch("/api/send-order-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              customerName: fullName,
              orderCode: order.orderCode,
              paymentMethod,
            }),
          });
        } catch (e) {
          console.error("Send mail error:", e);
        }
      }

      clearCart();

      if (order.paymentMethod === "BANK_TRANSFER") {
        router.push(`/checkout/payment?id=${order.id}`);
      } else {
        router.push(`/order-success?code=${order.orderCode}`);
      }
    } catch (error) {
      console.error(error);
      alert("Không thể tạo đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pb-24 pt-32 text-white md:px-8 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-14 text-3xl font-bold uppercase md:text-5xl">
            Thanh toán
          </h1>

          <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <CheckoutForm
                fullName={fullName}
                setFullName={setFullName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                province={province}
                setProvince={setProvince}
                district={district}
                setDistrict={setDistrict}
                ward={ward}
                setWard={setWard}
                address={address}
                setAddress={setAddress}
                note={note}
                setNote={setNote}
              />

              <PaymentMethod
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>

            <OrderSummary
              items={items}
              subtotal={subtotal}
              loading={loading}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}