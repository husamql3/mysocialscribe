export type DownloadTwitterSpacesParamsType = {
  url: string
  userId: string
  email: string
  downloadId?: string
}

export type CheckIfDownloadExistsParamsType = {
  url: string
  userId: string
}

export type UseDownloadType = {
  error: string | null
  downloadTwitterSpaces: (params: DownloadTwitterSpacesParamsType) => Promise<boolean>
  checkIfDownloadExists: (params: CheckIfDownloadExistsParamsType) => Promise<boolean>
}
