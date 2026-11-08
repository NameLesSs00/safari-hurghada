export function formatPrice(price: number, currency: string): string {
  return `${price.toFixed(1)} ${currency}`;
}
