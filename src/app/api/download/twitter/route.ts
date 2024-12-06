import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import { readFile, unlink, writeFile } from 'fs/promises'
import path from 'path'

import { createClient } from '@/db/supabase/client'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = createClient()

  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

    const filename = `twitter_space_${crypto.randomUUID().slice(0, 8)}.mp3`
    const filePath = path.join(process.cwd(), 'public', 'downloads', filename)

    await writeFile(path.join(process.cwd(), 'public', 'downloads', '.gitkeep'), '')

    return new Promise<NextResponse>((resolve) => {
      const ytDlpProcess = spawn('yt-dlp', [
        '-o',
        filePath,
        '-f',
        'bestaudio[ext=m4a]',
        '--extract-audio',
        '--audio-format',
        'mp3',
        url,
      ])

      ytDlpProcess.stderr.on('data', (data) => {
        console.error(`yt-dlp error: ${data}`)
      })

      ytDlpProcess.on('close', async (code) => {
        if (code === 0) {
          try {
            const file = await readFile(filePath)

            const { error } = await supabase.storage
              .from('twitter-spaces')
              .upload(`${filename}`, file, {
                cacheControl: '3600',
                upsert: true,
                contentType: 'audio/mpeg',
              })
            if (error) throw error

            const {
              data: { publicUrl },
            } = supabase.storage.from('twitter-spaces').getPublicUrl(filename)

            // Remove local file
            await unlink(filePath)

            resolve(NextResponse.json({ downloadUrl: publicUrl }, { status: 200 }))
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
  }
}
