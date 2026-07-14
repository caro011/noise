"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.replace("/admin/orders");
    }
  }

  async function handleLogin() {
    if (loading) return;

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("Không lấy được session.");
        return;
      }

      router.push("/admin/orders");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-5 pb-24 pt-32 text-white">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-10">

          <h1 className="mb-10 text-center text-3xl font-bold uppercase">
            ADMIN LOGIN
          </h1>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full rounded-xl border border-white/10 bg-transparent px-4 outline-none focus:border-white"
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 w-full rounded-xl border border-white/10 bg-transparent px-4 outline-none focus:border-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 h-14 w-full rounded-xl border border-white text-sm font-semibold uppercase tracking-[0.25em] transition hover:bg-white hover:text-black disabled:opacity-50"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}