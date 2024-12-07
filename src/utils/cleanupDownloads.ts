import path from 'path'
import { unlink } from 'fs/promises'

import { deleteOldDownloads, findOldDownloads } from '@/db/downloads.service'

export async function cleanupDownloads() {
  try {
    const oldDownloads = await findOldDownloads()

    for (const download of oldDownloads) {
      const filePath = path.join(process.cwd(), 'public', 'downloads', download.filename)

      // Delete file from local storage
      try {
        await Promise.all([unlink(filePath), deleteOldDownloads({ id: download.id })])
      } catch (unlinkError) {
        console.error(`Error deleting local file ${download.filename}:`, unlinkError)
      }
    }

    console.log('Cleanup completed successfully')
  } catch (error) {
    console.error('Cleanup error:', error)
  }
}
