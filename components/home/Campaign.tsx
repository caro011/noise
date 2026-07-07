import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function Campaign() {
  return (
    <FadeIn>
      <section className="bg-black py-32 text-white">
        <div className="mx-auto max-w-[1600px] px-10">

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
              Campaign
            </p>

            <h2 className="mt-4 text-5xl font-bold uppercase md:text-7xl">
              Chaos Never Sleeps
            </h2>
          </div>

          <div className="overflow-hidden rounded-sm">
            <Image
              src="/images/campaign01.jpg"
              alt="Campaign"
              width={1800}
              height={1000}
              className="h-auto w-full object-cover transition duration-700 hover:scale-[1.02]"
            />
          </div>

        </div>
      </section>
    </FadeIn>
  );
}