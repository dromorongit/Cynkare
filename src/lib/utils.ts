export function formatPrice(price: number): string {
  return `₵${price.toFixed(2)}`;
}

// Exchange rate is no longer needed - prices are entered directly in Ghana Cedis
// Keeping for backwards compatibility but not used
export const exchangeRate = 1;

export function convertToGHS(ghsPrice: number): number {
  // No conversion needed - prices are entered directly in GHS
  return ghsPrice;
}
