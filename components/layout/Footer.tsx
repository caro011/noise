export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-12 px-10 py-20 md:flex-row">

        <div>
          <h2 className="text-3xl font-bold uppercase tracking-[0.2em]">
            NOISE
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-500">
            From Chaos, Noise Rises.
            <br />
            A streetwear brand built for youth, rebellion and identity.
          </p>
        </div>

        <div className="flex gap-20">

          <div>
            <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Social
            </h3>

            <ul className="space-y-3">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Contact
            </h3>

            <ul className="space-y-3">
              <li>hello@noise.com</li>
              <li>Vietnam</li>
            </ul>
          </div>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs uppercase tracking-[0.3em] text-zinc-600">
        © 2026 NOISE. All Rights Reserved.
      </div>
    </footer>
  );
}