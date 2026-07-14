"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Product = {
  id: string;

  name: string;

  slug: string;

  price: number;

  stock: number;

  image: string | null;

  active: boolean;

  created_at: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState<string | null>(null);


  async function loadProducts() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/products");

      const json = await res.json();


      if (json.success) {
        setProducts(json.products);
      }

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadProducts();
  }, []);



  function updateProduct(
    id: string,
    field: keyof Product,
    value: any
  ) {

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              [field]: value,
            }
          : product
      )
    );

  }



  async function saveProduct(product: Product) {

    try {

      setSaving(product.id);


      const res = await fetch(
        `/api/admin/products/${product.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: product.name,

            slug: product.slug,

            price: product.price,

            stock: product.stock,

            active: product.active,
          }),
        }
      );


      const json = await res.json();


      if (json.success) {

        alert("Đã cập nhật sản phẩm");

      } else {

        alert("Cập nhật thất bại");

      }


    } catch (error) {

      console.error(error);

      alert("Có lỗi xảy ra");

    } finally {

      setSaving(null);

    }

  }



  return (
    <>
      <Navbar />


      <main className="min-h-screen bg-black px-5 pb-24 pt-32 text-white md:px-8 lg:px-10">


        <div className="mx-auto max-w-7xl">


          <div className="mb-12">

            <h1 className="text-4xl font-bold uppercase">
              Quản lý sản phẩm
            </h1>

            <p className="mt-3 text-zinc-400">
              Chỉnh sửa sản phẩm NOISE
            </p>

          </div>



          {loading ? (

            <p>
              Đang tải sản phẩm...
            </p>


          ) : (


            <div className="overflow-x-auto rounded-2xl border border-white/10">


              <table className="w-full">


                <thead className="bg-zinc-950">


                  <tr>

                    <th className="p-5 text-left">
                      Ảnh
                    </th>


                    <th className="text-left">
                      Tên
                    </th>


                    <th className="text-left">
                      Slug
                    </th>


                    <th className="text-left">
                      Giá
                    </th>


                    <th className="text-left">
                      Kho
                    </th>


                    <th className="text-left">
                      Hiển thị
                    </th>


                    <th className="text-left">
                      Lưu
                    </th>


                  </tr>


                </thead>


                <tbody>
                                      {products.map((product) => (

                    <tr
                      key={product.id}
                      className="border-t border-white/10"
                    >


                      <td className="p-5">


                        {product.image ? (

                          <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-zinc-900">

                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />

                          </div>


                        ) : (

                          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-zinc-900 text-xs text-zinc-500">

                            No image

                          </div>

                        )}


                      </td>



                      <td className="pr-5">


                        <input

                          value={product.name}

                          onChange={(e) =>
                            updateProduct(
                              product.id,
                              "name",
                              e.target.value
                            )
                          }

                          className="w-52 rounded-lg border border-white/20 bg-black px-3 py-2"

                        />


                      </td>



                      <td className="pr-5">


                        <input

                          value={product.slug}

                          onChange={(e) =>
                            updateProduct(
                              product.id,
                              "slug",
                              e.target.value
                            )
                          }

                          className="w-48 rounded-lg border border-white/20 bg-black px-3 py-2"

                        />


                      </td>




      <td className="pr-5">


        <input

          type="number"

          value={product.price}

          onChange={(e) =>
            updateProduct(
              product.id,
              "price",
              Number(e.target.value)
            )
          }

          className="w-32 rounded-lg border border-white/20 bg-black px-3 py-2"

        />


      </td>





      <td className="pr-5">


        <input

          type="number"

          value={product.stock}

          onChange={(e) =>
            updateProduct(
              product.id,
              "stock",
              Number(e.target.value)
            )
          }

          className="w-24 rounded-lg border border-white/20 bg-black px-3 py-2"

        />


      </td>





      <td>


        <button

          onClick={() =>
            updateProduct(
              product.id,
              "active",
              !product.active
            )
          }

          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            product.active
              ? "bg-white text-black"
              : "border border-white/20 text-zinc-400"
          }`}

        >

          {product.active
            ? "Đang bán"
            : "Ẩn"}

        </button>


      </td>





      <td>


        <button

          onClick={() =>
            saveProduct(product)
          }

          disabled={saving === product.id}

          className="rounded-lg border border-white px-4 py-2 text-sm transition hover:bg-white hover:text-black disabled:opacity-50"

        >

          {saving === product.id
            ? "Lưu..."
            : "Lưu"}

        </button>


      </td>




                    </tr>


                  ))}


                </tbody>


              </table>


            </div>


          )}


        </div>


      </main>


      <Footer />

    </>
  );
}