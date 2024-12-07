import { NextResponse } from 'next/server'

import { cleanupDownloads } from '@/utils/cleanupDownloads'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await cleanupDownloads()
    return NextResponse.json({ message: 'Cron job executed successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error executing cron job:', error)
    return NextResponse.json({ error: 'Error executing cron job' }, { status: 500 })
  }
}
