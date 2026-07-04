export function findObjectById<T extends { id: string | number }>(
  items: T[],
  id: string | number | null | undefined,
): T | undefined {
  if (id == null) return undefined;
  return items.find((item) => String(item.id) === String(id));
}
