"use client";

import { useState } from "react";

import { Product } from "@/data/products";
import { useCartStore } from "@/lib/store/cartStore";

import Toast from "@/components/ui/Toast";

import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import SizeGuide from "./SizeGuide";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const [showToast, setShowToast] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: selectedSize,
      quantity,
    });

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <>
      <div className="flex flex-col">

        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 md:text-sm md:tracking-[0.3em]">
          {product.category}
        </p>

        <h1 className="mt-3 text-3xl font-bold uppercase leading-tight md:text-5xl">
          {product.name}
        </h1>

        <p className="mt-6 text-2xl font-semibold md:mt-8 md:text-3xl">
          {product.price.toLocaleString("vi-VN")}₫
        </p>


        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
        />

        <button
          onClick={() => setShowSizeGuide(true)}
          className="
            mt-4
            self-start
            text-xs
            uppercase
            tracking-[0.25em]
            text-zinc-500
            transition
            hover:text-white
          "
        >
          XEM BẢNG KÍCH THƯỚC
        </button>

        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((prev) => prev + 1)}
          onDecrease={() =>
            setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
          }
        />

        <button
          onClick={handleAddToCart}
          className="
            mt-8
            h-14
            w-full
            border
            border-white
            text-sm
            font-semibold
            uppercase
            tracking-[0.25em]
            transition
            hover:bg-white
            hover:text-black
            md:mt-10
          "
        >
          THÊM VÀO GIỎ HÀNG
        </button>

        <div className="mt-12 border-t border-zinc-800 pt-8">

          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.3em]">
            THÔNG TIN SẢN PHẨM
          </h3>

          <ul className="space-y-3 text-sm leading-7 text-zinc-500">
            <li>• Chất liệu: {product.material}</li>
            <li>• Định lượng vải: {product.gsm} GSM</li>
            <li>• Form áo: {product.fit}</li>
            <li>• Công nghệ in: In lụa</li>
            <li>• Sản xuất tại Việt Nam</li>
          </ul>

        </div>

        <div className="mt-10 border-t border-zinc-800 pt-8">

          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.3em]">
            CHÍNH SÁCH
          </h3>

          <div className="space-y-3 text-sm leading-7 text-zinc-500">
            <p>• Xử lý đơn hàng trong vòng 1–3 ngày làm việc.</p>
            <p>• Giao hàng trên toàn quốc.</p>
            <p>• Hỗ trợ đổi size trong vòng 7 ngày kể từ khi nhận hàng.</p>
            <p>• Sản phẩm đổi phải còn nguyên tem và chưa qua sử dụng.</p>
          </div>

        </div>

      </div>

      <SizeGuide
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <Toast
        show={showToast}
        image={product.images[0]}
        title={product.name}
        size={selectedSize}
        price={product.price}
      />
    </>
  );
}