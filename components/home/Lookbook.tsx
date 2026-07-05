import Image from "next/image";

export default function Lookbook() {
  return (
    <section className="bg-black py-32 text-white">
      <div className="mx-auto max-w-[1600px] px-10">

        <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
          Lookbook
        </p>

        <h2 className="mt-4 mb-20 text-5xl font-bold uppercase md:text-7xl">
          2026 Collection
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <Image
            src="/images/lookbook01.jpg"
            alt="Lookbook 1"
            width={800}
            height={1200}
            className="h-full w-full object-cover"
          />

          <Image
            src="/images/lookbook04.jpg"
            alt="Lookbook 4"
            width={800}
            height={1200}
            className="h-full w-full object-cover"
          />

          <Image
            src="/images/lookbook02.jpg"
            alt="Lookbook 2"
            width={800}
            height={1200}
            className="h-full w-full object-cover"
          />

          <Image
            src="/images/lookbook03.jpg"
            alt="Lookbook 3"
            width={800}
            height={1200}
            className="h-full w-full object-cover"
          />

        </div>

      </div>
    </section>
  );
}