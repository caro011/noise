import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { orderCode, phone } = await request.json();

    if (!orderCode || !phone) {
      return NextResponse.json(
        {
          error: "Thiếu thông tin.",
        },
        {
          status: 400,
        }
      );
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_code", orderCode.trim())
      .eq("phone", phone.trim())
      .single();

    if (error || !order) {
      return NextResponse.json(
        {
          error: "Không tìm thấy đơn hàng.",
        },
        {
          status: 404,
        }
      );
    }

    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);

    return NextResponse.json({
      order,
      items,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Đã xảy ra lỗi.",
      },
      {
        status: 500,
      }
    );
  }
}