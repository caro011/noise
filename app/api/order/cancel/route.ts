import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Thiếu mã đơn." },
        { status: 400 }
      );
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: "Không tìm thấy đơn." },
        { status: 404 }
      );
    }

    if (
      order.status !== "Mới" &&
      order.status !== "Đang xử lý"
    ) {
      return NextResponse.json(
        {
          error: "Đơn hàng không thể hủy.",
        },
        {
          status: 400,
        }
      );
    }

    const paymentStatus =
      order.payment_method === "BANK_TRANSFER"
        ? "REFUND_PENDING"
        : "UNPAID";

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "Đã hủy",
        payment_status: paymentStatus,
        cancelled_at: new Date().toISOString(),
        cancelled_by: "CUSTOMER",
      })
      .eq("id", orderId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
    });

  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        error: "Không thể hủy đơn.",
      },
      {
        status: 500,
      }
    );
  }
}