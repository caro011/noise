export function generateVietQR(
  bankBin: string,
  accountNumber: string,
  amount: number,
  content: string
) {
  const encodedContent = encodeURIComponent(content);

  return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodedContent}`;
}