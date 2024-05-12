export default function filterIdNos(
  value: string | null | undefined
): string[] {
  return value ? value.split('/').filter((item: string) => !!item) : [];
}
