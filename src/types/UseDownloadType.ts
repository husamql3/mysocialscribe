export type UseDownloadType = {
  downloading: boolean
  downloadUrl: string | null
  error: string | null
  downloadTwitterSpaces: (url: string) => Promise<void>
}
