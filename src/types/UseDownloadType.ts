export type DownloadTwitterSpacesType = {
  url: string
  userId: string
}

export type UseDownloadType = {
  error: string | null
  downloadTwitterSpaces: ({ url, userId }: DownloadTwitterSpacesType) => Promise<void>
}
