// import { unlink } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

import { getDownloadById, softDeleteDownload } from '@/db/supabase/services/downloads.service' // import { getFilePath } from '@/utils/getFilePath'

// import { getFilePath } from '@/utils/getFilePath'

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Get download record
    const dl = await getDownloadById({ id })

    // if filename is present, delete the file
    // if (dl.filename) {
    //   const filePath = getFilePath(dl.filename)
    //   await unlink(filePath).catch(() => {})
    // }

    // Delete download record
    await softDeleteDownload(dl.id)

    return NextResponse.json(
      {
        message: 'Download soft deleted successfully',
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
