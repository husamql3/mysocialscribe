export type DownloadTwitterSpacesType = {
  url: string
  userId: string
  email: string
  redirect?: boolean
}

export type UseDownloadType = {
  error: string | null
  downloadTwitterSpaces: ({ url, userId }: DownloadTwitterSpacesType) => Promise<void>
  isDownloading: boolean
}
