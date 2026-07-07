import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";

import { products } from "@/data/products";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-28 pb-20 text-white md:pt-36 md:pb-24">

        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

            <ProductGallery
              images={product.images}
              name={product.name}
            />

            <ProductInfo
              product={product}
            />

          </div>

          <RelatedProducts currentSlug={product.slug} />

        </div>

      </main>

      <Footer />
    </>
  );
}