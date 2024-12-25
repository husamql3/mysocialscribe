import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'

import { getRecentDownloads } from '@/db/supabase/services/downloads.service'
import { DlType } from '@/types/DownlodsType'
import { removeCachedDownload } from '@/db/supabase/services/downloads.service'

export async function GET() {
  try {
    const oldDownloads = await getRecentDownloads()

    const cleanupTasks = oldDownloads.map(async (download: DlType) => {
      const filePath = path.join(process.cwd(), 'public', 'downloads', download.filename!)
      await Promise.all([unlink(filePath).catch(() => {}), removeCachedDownload(download.id)])
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
