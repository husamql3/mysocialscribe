import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { unlink } from 'fs/promises'

import { hardDeleteDownload } from '@/db/downloads.service'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { filename, downloadId } = data

    // File deletion
    if (filename?.trim()) {
      const filePath = path.join(process.cwd(), 'public', 'downloads', filename)
      await unlink(filePath).catch(() => {})
    }

    // Delete download record
    await hardDeleteDownload(downloadId)

    // Revalidate the history route
    revalidatePath('/history')

    return NextResponse.json(
      {
        message: 'Download deleted successfully',
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Download deletion error:', error)
    return NextResponse.json(
      {
        message: 'Failed to delete download',
        success: false,
      },
      { status: 500 }
    )
  }
}
