"use client";

type Props = {
  value: "BANK_TRANSFER" | "COD";
  onChange: (value: "BANK_TRANSFER" | "COD") => void;
};

export default function PaymentMethod({
  value,
  onChange,
}: Props) {
  return (
    <section className="mt-10">

      <h2 className="mb-6 text-xl font-semibold uppercase">
        Phương thức thanh toán
      </h2>

      <div className="space-y-4">

        <button
          type="button"
          onClick={() => onChange("BANK_TRANSFER")}
          className={`w-full rounded-2xl border p-5 text-left transition ${
            value === "BANK_TRANSFER"
              ? "border-white bg-white/5"
              : "border-white/10 hover:border-white/40"
          }`}
        >
          <div className="flex items-start gap-4">

            <div
              className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${
                value === "BANK_TRANSFER"
                  ? "border-white"
                  : "border-zinc-600"
              }`}
            >
              {value === "BANK_TRANSFER" && (
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              )}
            </div>

            <div>

              <h3 className="font-semibold">
                Chuyển khoản ngân hàng (BIDV)
              </h3>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Sau khi đặt hàng, hệ thống sẽ hiển thị mã QR để bạn
                chuyển khoản.
              </p>

            </div>

          </div>

        </button>

        <button
          type="button"
          onClick={() => onChange("COD")}
          className={`w-full rounded-2xl border p-5 text-left transition ${
            value === "COD"
              ? "border-white bg-white/5"
              : "border-white/10 hover:border-white/40"
          }`}
        >
          <div className="flex items-start gap-4">

            <div
              className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${
                value === "COD"
                  ? "border-white"
                  : "border-zinc-600"
              }`}
            >
              {value === "COD" && (
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              )}
            </div>

            <div>

              <h3 className="font-semibold">
                Thanh toán khi nhận hàng (COD)
              </h3>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Bạn sẽ thanh toán trực tiếp cho đơn vị vận chuyển khi
                nhận được hàng.
              </p>

            </div>

          </div>

        </button>

      </div>

    </section>
  );
}