import { spawn } from 'child_process'
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

import {
  createDownloadRecord,
  reDownloadRecord,
  updateDownloadRecord,
} from '@/db/supabase/services/downloads.service'
import { DlType } from '@/types/DownlodsType'
import { sendDownloadEmail } from '@/utils/sendDownloadEmail'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { space_url, user_id, email, downloadId } = await req.json()

  if (!space_url) {
    console.error('Download request missing URL')
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  if (!user_id) {
    console.error('Download request from unauthenticated user')
    return NextResponse.json({ error: 'User must be logged in' }, { status: 401 })
  }

  try {
    let dlRecord: DlType | null = null

    if (downloadId) {
      dlRecord = await reDownloadRecord({ id: downloadId })
      console.log('update download record', dlRecord)
    } else {
      dlRecord = await createDownloadRecord({ user_id, space_url })
      console.log('create download record', dlRecord)
    }

    if (!dlRecord) {
      console.error('Failed to create download record')
      return NextResponse.json({ error: 'Failed to create download record' }, { status: 500 })
    }

    const filename = `twitter_space_${crypto.randomUUID().slice(0, 8)}.mp3`
    const filePath = path.join(process.cwd(), 'public', 'downloads', filename)

    await writeFile(path.join(process.cwd(), 'public', 'downloads', '.gitkeep'), '')

    return new Promise<NextResponse>((resolve) => {
      const ytDlpProcess = spawn(
        'yt-dlp',
        [
          '-o',
          filePath,
          '-f',
          'bestaudio[ext=m4a]',
          '--extract-audio',
          '--audio-format',
          'mp3',
          space_url,
        ],
        { stdio: ['ignore', 'pipe', 'ignore'] }
      )

      ytDlpProcess.stdout.on('data', (chunk) => {
        console.log(chunk.toString())
      })

      ytDlpProcess.on('close', async (code) => {
        if (code === 0) {
          try {
            const dlUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/downloads/` + filename
            console.log('download space_url', dlUrl)

            // Save the download record to the database, and send the email to the user
            await Promise.all([
              updateDownloadRecord({
                id: dlRecord.id,
                filename,
              }),
              sendDownloadEmail({
                to: email,
                href: dlUrl,
                downloadName: filename,
              }),
            ])
            resolve(NextResponse.json({ downloadUrl: dlUrl }, { status: 200 }))
          } catch {
            resolve(NextResponse.json({ error: 'Upload failed' }, { status: 501 }))
          }
        } else {
          resolve(NextResponse.json({ error: 'Download failed' }, { status: 502 }))
        }
      })
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 503 })
  }
}
