import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'

import { getRecentDownloads, updateDownloadFilename } from '@/db/downloads.service'
import { UserDownload } from '@/types/DownlodsType'

export async function GET() {
  try {
    const oldDownloads = await getRecentDownloads()

    const cleanupTasks = oldDownloads.map(async (download: UserDownload) => {
      const filePath = path.join(process.cwd(), 'public', 'downloads', download.filename)

      await Promise.all([unlink(filePath).catch(() => {}), updateDownloadFilename(download.id)])
    })

    await Promise.all(cleanupTasks)

    return NextResponse.json(
      {
        message: 'Cron job executed successfully',
        deleted: oldDownloads,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Cleanup process failed:', error)
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
  }
}
