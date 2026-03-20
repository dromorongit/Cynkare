export function formatPrice(price: number): string {
  return `GH₵${price.toFixed(2)}`;
}

// Exchange rate: 1 USD = 12.5 GHS (approximate)
export const exchangeRate = 12.5;

export function convertToGHS(usdPrice: number): number {
  return usdPrice * exchangeRate;
}
