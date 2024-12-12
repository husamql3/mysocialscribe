export const createShareableUrl = (spaceUrl: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  return `${baseUrl}?spaceUrl=${encodeURIComponent(spaceUrl)}`
}
