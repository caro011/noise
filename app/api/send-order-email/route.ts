import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    console.log("========== SEND ORDER EMAIL ==========");

    console.log(
      "RESEND KEY:",
      process.env.RESEND_API_KEY?.slice(0, 12)
    );

    const body = await req.json();

    const {
      email,
      customerName,
      orderCode,
      total,
      paymentMethod,
    } = body;

    console.log("REQUEST BODY:", body);

    if (!email) {
      console.log("EMAIL IS EMPTY");

      return NextResponse.json({
        success: false,
        message: "Email is empty",
      });
    }

    const result = await resend.emails.send({
      from: "NOISE <onboarding@resend.dev>",
      to: email,
      subject: `NOISE | Xác nhận đơn hàng ${orderCode}`,

      html: `
      <div style="
        background:#000;
        color:#fff;
        padding:40px;
        font-family:Arial,sans-serif;
      ">

        <h1 style="margin-bottom:30px;">
          NOISE
        </h1>

        <p>Xin chào <b>${customerName}</b>,</p>

        <p>
          Cảm ơn bạn đã đặt hàng tại <b>NOISE</b>.
        </p>

        <hr style="margin:30px 0;border-color:#333;" />

        <p><b>Mã đơn:</b> ${orderCode}</p>

        <p><b>Tổng tiền:</b>
        ${Number(total).toLocaleString("vi-VN")}₫
        </p>

        <p><b>Thanh toán:</b>
        ${
          paymentMethod === "BANK_TRANSFER"
            ? "Chuyển khoản"
            : "Thanh toán khi nhận hàng"
        }
        </p>

        <hr style="margin:30px 0;border-color:#333;" />

        <p>
          Chúng mình sẽ xác nhận đơn và giao hàng sớm nhất.
        </p>

        <br>

        <b>From Chaos, Noise Rises.</b>

      </div>
      `,
    });

    console.log("RESEND RESULT:");
    console.dir(result, { depth: null });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (e) {
    console.error("========== RESEND ERROR ==========");
    console.error(e);

    return NextResponse.json(
      {
        success: false,
        error: String(e),
      },
      {
        status: 500,
      }
    );
  }
}