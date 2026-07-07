type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="mt-10">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
        Quantity
      </p>

      <div className="flex h-12 w-40 items-center justify-between border border-zinc-700">

        <button
          onClick={onDecrease}
          className="flex h-full w-12 items-center justify-center text-xl transition hover:bg-white hover:text-black"
        >
          −
        </button>

        <span className="text-lg font-medium">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          className="flex h-full w-12 items-center justify-center text-xl transition hover:bg-white hover:text-black"
        >
          +
        </button>

      </div>
    </div>
  );
}