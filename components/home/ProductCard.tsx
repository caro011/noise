import Image from "next/image";

type ProductCardProps = {
  image: string;
  name: string;
  price: string;
};

export default function ProductCard({
  image,
  name,
  price,
}: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-sm bg-[#111]">

        <Image
          src={image}
          alt={name}
          width={800}
          height={1000}
          className="aspect-[4/5] w-full object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/35" />

        {/* Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <button className="border border-white px-8 py-3 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition">
            View Product
          </button>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold uppercase tracking-[0.15em]">
            {name}
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Oversized Tee
          </p>
        </div>

        <p className="text-sm tracking-widest text-zinc-300">
          {price}
        </p>
      </div>
    </div>
  );
}