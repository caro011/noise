import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const subtotal = body.items.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    const shipping = 30000;

    const total = subtotal + shipping;

    const orderCode =
      "NS" + Date.now().toString().slice(-8);

    const paymentStatus =
      body.paymentMethod === "BANK_TRANSFER"
        ? "PENDING"
        : "UNPAID";

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_code: orderCode,

        customer_name: body.customerName,
        phone: body.phone,
        email: body.email,

        province: body.province,
        district: body.district,
        ward: body.ward,
        address: body.address,

        note: body.note,

        subtotal,
        shipping,
        total,

        payment_method: body.paymentMethod,
        payment_status: paymentStatus,

        status: "Mới",
      })
      .select()
      .single();

    if (error) throw error;

    const orderItems = body.items.map((item: any) => ({
      order_id: order.id,

      product_id: item.id,

      product_name: item.name,

      size: item.size,

      quantity: item.quantity,

      price: item.price,
    }));

    const { error: itemError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemError) throw itemError;

    return NextResponse.json({
      success: true,

      id: order.id,

      orderCode,

      paymentMethod: body.paymentMethod,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err,
      },
      {
        status: 500,
      }
    );
  }
}