import { Download } from '@prisma/client'

export type DownloadParams = {
  spaceUrl: string
  userId: string
  downloadId?: string
}

export type DownloadResult = {
  download: Download
  startDownloading: boolean
}

export type UpdateOrInsertDownload = {
  data: Partial<Download>
  downloadId?: string
}
