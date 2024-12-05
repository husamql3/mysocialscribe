export type DownloadTwitterSpacesType = {
  url: string
  userId: string
}

export type UseDownloadType = {
  downloading: boolean
  error: string | null
  downloadTwitterSpaces: ({ url, userId }: DownloadTwitterSpacesType) => Promise<void>
}
