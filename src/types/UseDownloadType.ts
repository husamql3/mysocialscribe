export type DownloadTwitterSpacesParamsType = {
  url: string
  userId: string
  email: string
  downloadId?: string
}

export type UseDownloadType = {
  error: string | null
  downloadTwitterSpaces: (params: DownloadTwitterSpacesParamsType) => Promise<boolean>
}
