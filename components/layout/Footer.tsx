import FadeIn from "@/components/ui/FadeIn";

export default function Footer() {
  return (
    <FadeIn>
      <footer className="border-t border-white/10 bg-black py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 md:flex-row">

          <div>
            <h3 className="text-xl font-bold uppercase tracking-[0.2em]">
              NOISE
            </h3>

            <p className="mt-3 text-sm text-zinc-500">
              From Chaos, Noise Rises.
            </p>
          </div>

          <div className="flex gap-10 text-xs uppercase tracking-[0.25em] text-zinc-400">

            <a href="#" className="transition hover:text-white">
              Instagram
            </a>

            <a href="#" className="transition hover:text-white">
              Behance
            </a>

            <a href="#" className="transition hover:text-white">
              Contact
            </a>

          </div>

        </div>
      </footer>
    </FadeIn>
  );
}