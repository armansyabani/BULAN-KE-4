export function isValidImageUrl(url: string) {
  const trimmed = url.trim();
  // wajib http/https + tidak ada spasi
  return /^https?:\/\/\S+$/i.test(trimmed);
}
