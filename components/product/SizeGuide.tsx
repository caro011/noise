"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SizeGuide({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-950 p-8 text-white"
      >
        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold uppercase">
            Size Guide
          </h2>

          <button
            onClick={onClose}
            className="text-3xl transition hover:rotate-90"
          >
            ×
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse text-center">

            <thead>

              <tr className="border-b border-white/10">

                <th className="py-4">Size</th>
                <th>Chest</th>
                <th>Length</th>
                <th>Shoulder</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b border-white/10">

                <td className="py-4">M</td>
                <td>58 cm</td>
                <td>72 cm</td>
                <td>55 cm</td>

              </tr>

              <tr className="border-b border-white/10">

                <td className="py-4">L</td>
                <td>60 cm</td>
                <td>74 cm</td>
                <td>57 cm</td>

              </tr>

              <tr>

                <td className="py-4">XL</td>
                <td>62 cm</td>
                <td>76 cm</td>
                <td>59 cm</td>

              </tr>

            </tbody>

          </table>

        </div>

        <p className="mt-8 text-sm leading-7 text-zinc-500">
          Measurements may vary by ±1–2 cm due to the production process.
        </p>

      </div>

    </div>
  );
}