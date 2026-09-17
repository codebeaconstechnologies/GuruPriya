export function formatDateRange(start?: string, end?: string): string {
  if (!start || !end) return "";
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startStr = startDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const endStr = endDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return `${startStr} – ${endStr}`;
}

export function formatDate(date?: string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
