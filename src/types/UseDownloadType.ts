export type DownloadTwitterSpacesParamsType = {
  url: string
  userId: string
  email: string
}

export type DownloadTwitterSpacesReturnType = {
  error: string | null
  success: boolean
}

export type UseDownloadType = {
  error: string | null
  downloadTwitterSpaces: (
    params: DownloadTwitterSpacesParamsType
  ) => Promise<DownloadTwitterSpacesReturnType>
}
