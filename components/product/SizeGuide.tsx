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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-950 p-8 text-white"
      >
        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold uppercase tracking-[0.2em]">
            BẢNG KÍCH THƯỚC
          </h2>

          <button
            onClick={onClose}
            className="text-3xl transition duration-300 hover:rotate-90"
          >
            ×
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="border-b border-white/10 text-center text-sm uppercase tracking-[0.15em] text-zinc-400">

                <th className="py-4">Size</th>

                <th>Ngang ngực</th>

                <th>Dài áo</th>

                <th>Rộng vai</th>

              </tr>

            </thead>

            <tbody className="text-center">

              <tr className="border-b border-white/10 transition hover:bg-white/5">

                <td className="py-5 font-semibold">M</td>

                <td>58 cm</td>

                <td>72 cm</td>

                <td>55 cm</td>

              </tr>

              <tr className="border-b border-white/10 transition hover:bg-white/5">

                <td className="py-5 font-semibold">L</td>

                <td>60 cm</td>

                <td>74 cm</td>

                <td>57 cm</td>

              </tr>

              <tr className="transition hover:bg-white/5">

                <td className="py-5 font-semibold">XL</td>

                <td>62 cm</td>

                <td>76 cm</td>

                <td>59 cm</td>

              </tr>

            </tbody>

          </table>

        </div>

        <p className="mt-8 text-sm leading-7 text-zinc-500">
          Kích thước thực tế có thể chênh lệch khoảng ±1–2 cm do quá trình sản
          xuất.
        </p>

      </div>
    </div>
  );
}