"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <Image
          src={selectedImage}
          alt={name}
          width={900}
          height={1200}
          className="aspect-[3/4] h-auto w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4">

        {images.map((image) => (
          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-lg border transition ${
              selectedImage === image
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
  );
}