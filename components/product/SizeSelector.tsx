type Props = {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
};

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: Props) {
  return (
    <div className="mt-10">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
        Size
      </p>

      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`h-12 w-12 border transition ${
              selectedSize === size
                ? "border-white bg-white text-black"
                : "border-zinc-700 hover:border-white"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}