export type CreateOrderInput = {
  customerName: string;
  phone: string;
  email: string;

  province: string;
  district: string;
  ward: string;
  address: string;

  note: string;

  paymentMethod: "BANK_TRANSFER" | "COD";

  items: {
    id: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
  }[];
};

export async function createOrder(data: CreateOrderInput) {
  const res = await fetch("/api/orders", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.error ?? "Không thể tạo đơn hàng");
  }

  return {
    id: json.id,
    orderCode: json.orderCode,
    paymentMethod: json.paymentMethod,
  };
}