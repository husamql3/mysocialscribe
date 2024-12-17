export type SaveDownloadRecord = {
  userId: string
  url: string
  filename: string
}

export type UserDownload = {
  id: string
  created_at: string
  user_id: string
  filename: string
  space_url: string
  is_deleted: boolean
}
