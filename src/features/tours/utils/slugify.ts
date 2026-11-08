export function generateSlug(id: number, name: string): string {
  const slug = name
    .trim()
    .replace(/[\s_-]+/g, "-") // Swap spaces and underscores with hyphens
    .replace(/[^\p{L}\p{N}-]/gu, "") // Keep letters, numbers, and hyphens (Unicode aware)
    .replace(/^-+|-+$/g, "") // Trim leading/trailing hyphens
    .toLowerCase();

  return `${id}-${slug}`;
}

export const generateTripSlug = generateSlug;

export function extractIdFromSlug(slug?: string): number | null {
  if (!slug) return null;
  const match = slug.match(/^(\d+)(?:-|$)/);
  return match ? parseInt(match[1], 10) : null;
}
