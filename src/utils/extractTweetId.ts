// export function extractTweetId(url: string): string {
//   return url?.split('/status/')[1]?.trim()
// }

export function extractTweetId(url: string): string | null {
  try {
    const parsedUrl = new URL(url)
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean)

    // Handle standard tweet URL
    if (pathParts[1] === 'status' && pathParts[2]) {
      return pathParts[2]
    }

    // Handle Spaces URL
    if (pathParts[0] === 'i' && pathParts[1] === 'spaces' && pathParts[2]) {
      return pathParts[2]
    }

    return null
  } catch {
    console.error('Invalid URL:', url)
    return null
  }
}
