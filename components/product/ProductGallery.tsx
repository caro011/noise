"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const selectedImage = images[currentIndex];

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div>

        {/* Main Image */}

        <button
          onClick={() => setIsOpen(true)}
          className="overflow-hidden rounded-xl border border-white/10"
        >
          <Image
            src={selectedImage}
            alt={name}
            width={900}
            height={1200}
            className="aspect-[3/4] h-auto w-full object-cover transition duration-500 hover:scale-105"
          />
        </button>

        {/* Thumbnails */}

        <div className="mt-5 grid grid-cols-4 gap-4">

          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setCurrentIndex(index)}
              className={`overflow-hidden rounded-lg border transition ${
                currentIndex === index
                  ? "border-white"
                  : "border-white/10"
              }`}
            >
              <Image
                src={image}
                alt={name}
                width={200}
                height={260}
                className="aspect-[3/4] object-cover"
              />
            </button>
          ))}

        </div>

      </div>

      {/* Lightbox */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-6"
        >

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 text-5xl text-white transition hover:opacity-70"
          >
            ‹
          </button>

          <Image
            src={selectedImage}
            alt={name}
            width={1200}
            height={1600}
            className="max-h-[90vh] w-auto rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 text-5xl text-white transition hover:opacity-70"
          >
            ›
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-6 text-5xl text-white transition hover:rotate-90"
          >
            ×
          </button>

        </div>
      )}
    </>
  );
}