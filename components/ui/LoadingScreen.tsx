"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [hide, setHide] = useState(false);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => {
      setHide(true);
    }, 1500);

    const done = setTimeout(() => {
      setRemove(true);
    }, 2200);

    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  if (remove) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        hide ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/logo/logow.svg"
        alt="NOISE"
        width={700}
        height={180}
        priority
        className="w-[75vw] max-w-[650px] select-none"
      />
    </div>
  );
}