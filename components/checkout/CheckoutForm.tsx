"use client";

type Props = {
  fullName: string;
  setFullName: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  province: string;
  setProvince: (value: string) => void;

  district: string;
  setDistrict: (value: string) => void;

  ward: string;
  setWard: (value: string) => void;

  address: string;
  setAddress: (value: string) => void;

  note: string;
  setNote: (value: string) => void;
};

export default function CheckoutForm({
  fullName,
  setFullName,

  phone,
  setPhone,

  email,
  setEmail,

  province,
  setProvince,

  district,
  setDistrict,

  ward,
  setWard,

  address,
  setAddress,

  note,
  setNote,
}: Props) {
  return (
    <div className="space-y-10">

      {/* Thông tin khách hàng */}

      <section>

        <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em]">
          Thông tin khách hàng
        </h2>

        <div className="grid gap-4">

          <input
            type="text"
            placeholder="Họ và tên *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-14 rounded-xl border border-white/10 bg-zinc-950 px-5 outline-none transition focus:border-white"
          />

          <input
            type="tel"
            placeholder="Số điện thoại *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-14 rounded-xl border border-white/10 bg-zinc-950 px-5 outline-none transition focus:border-white"
          />

          <input
            type="email"
            placeholder="Email (không bắt buộc)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 rounded-xl border border-white/10 bg-zinc-950 px-5 outline-none transition focus:border-white"
          />

        </div>

      </section>

      {/* Địa chỉ */}

      <section>

        <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em]">
          Địa chỉ giao hàng
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <input
            type="text"
            placeholder="Tỉnh / Thành phố"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="h-14 rounded-xl border border-white/10 bg-zinc-950 px-5 outline-none transition focus:border-white"
          />

          <input
            type="text"
            placeholder="Quận / Huyện"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="h-14 rounded-xl border border-white/10 bg-zinc-950 px-5 outline-none transition focus:border-white"
          />

          <input
            type="text"
            placeholder="Phường / Xã"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            className="h-14 rounded-xl border border-white/10 bg-zinc-950 px-5 outline-none transition focus:border-white md:col-span-2"
          />

          <input
            type="text"
            placeholder="Số nhà, tên đường..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-14 rounded-xl border border-white/10 bg-zinc-950 px-5 outline-none transition focus:border-white md:col-span-2"
          />

        </div>

      </section>

      {/* Ghi chú */}

      <section>

        <h2 className="mb-6 text-xl font-bold uppercase tracking-[0.15em]">
          Ghi chú
        </h2>

        <textarea
          rows={5}
          placeholder="Ví dụ: Gọi trước khi giao hàng..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-950 p-5 outline-none transition focus:border-white resize-none"
        />

      </section>

    </div>
  );
}