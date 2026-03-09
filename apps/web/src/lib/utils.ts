// apps/web/src/lib/utils.ts

export function formatDate(date: string | Date) {
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}