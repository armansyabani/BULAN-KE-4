export function formatIDR(value: number) {
  const rounded = Math.round(value);
  const s = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${s}`;
}
