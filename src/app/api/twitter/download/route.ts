import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import { writeFile } from 'fs/promises'
import path from 'path'

import { saveDownloadRecord } from '@/db/downloads.service'
import { sendDownloadEmail } from '@/utils/sendDownloadEmail'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { url, userId, email } = await req.json()
  if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  if (!userId) return NextResponse.json({ error: 'User must be logged in' }, { status: 401 })

  try {
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
          url,
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
            console.log('download url', dlUrl)

            // Save the download record to the database, and send the email to the user
            await Promise.all([
              saveDownloadRecord({
                userId,
                url,
                filename,
              }),
              sendDownloadEmail({
                to: email,
                href: dlUrl,
                downloadName: filename,
              }),
            ])

            resolve(NextResponse.json({ downloadUrl: dlUrl }, { status: 200 }))
          } catch (uploadError) {
            console.error('Upload error:', uploadError)
            resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }))
          }
        } else {
          resolve(NextResponse.json({ error: 'Download failed' }, { status: 500 }))
        }
      })
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  } finally {
    // Revalidate the history route
    revalidatePath('/history')
  }
}
