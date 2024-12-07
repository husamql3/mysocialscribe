export type SaveDownloadRecord = {
  userId: string
  url: string
  filename: string
}

export type OldDownload = {
  id: string
  user_id: string
  space_url: string
  filename: string
  created_at: string
}
