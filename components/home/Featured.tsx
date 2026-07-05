import FadeIn from "@/components/ui/FadeIn";
import ProductCard from "./ProductCard";

export default function Featured() {
  return (
   <FadeIn>
    <section className="bg-black py-32 text-white">
      <div className="mx-auto max-w-[1600px] px-10">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
            Latest Collection
          </p>

          <h2 className="mt-4 text-5xl font-bold uppercase">
            Featured
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <ProductCard
            image="/images/product01.jpg"
            name="Chaos Tee"
            price="$39"
          />

          <ProductCard
            image="/images/product02.jpg"
            name="Lost Kids Tee"
            price="$39"
          />
        </div>
      </div>
    </section>
   </FadeIn>  
  );
}