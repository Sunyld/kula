export function formatMzn(value: number): string {
  try {
    return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN', maximumFractionDigits: 0 }).format(value);
  } catch {
    return `${value.toLocaleString()} MZN`;
  }
}


