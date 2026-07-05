import Image from "next/image";

export default function Campaign() {
  return (
    <section className="relative h-screen overflow-hidden">
      <Image
        src="/images/campaign01.jpg"
        alt="Campaign"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">

        <p className="mb-5 text-sm uppercase tracking-[0.5em] text-zinc-300">
          Campaign 2026
        </p>

        <h2 className="max-w-5xl text-5xl font-bold uppercase leading-tight md:text-8xl">
          From Chaos,
          <br />
          Noise Rises.
        </h2>

        <button className="mt-12 border border-white px-10 py-4 text-xs uppercase tracking-[0.35em] transition duration-300 hover:bg-white hover:text-black">
          Discover
        </button>

      </div>
    </section>
  );
}