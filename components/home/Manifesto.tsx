import FadeIn from "@/components/ui/FadeIn";

export default function Manifesto() {
  return (
    <FadeIn>
      <section className="bg-black py-40 text-white">
        <div className="mx-auto max-w-5xl px-8 text-center">

          <p className="text-xs uppercase tracking-[0.5em] text-zinc-500">
            Manifesto
          </p>

          <h2 className="mt-8 text-5xl font-bold uppercase md:text-7xl">
            We Don't Follow.
          </h2>

          <p className="mx-auto mt-12 max-w-3xl text-lg leading-9 text-zinc-400">
            Noise was created for those who never fit into the ordinary.
            We believe chaos shapes identity, and every collection reflects
            the courage to be different. This is more than clothing.
            It is a voice.
          </p>

        </div>
      </section>
    </FadeIn>
  );
}