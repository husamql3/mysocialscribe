import { NextRequest, NextResponse } from 'next/server'

import { checkIfDownloadExists } from '@/db/supabase/services/downloads.service'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { user_id, space_url } = await req.json()

  if (!user_id) {
    console.error('Download request from unauthenticated user')
    return NextResponse.json({ error: 'User must be logged in' }, { status: 401 })
  }

  try {
    const dlExists = await checkIfDownloadExists({ space_url, user_id })
    if (dlExists) return NextResponse.json({ error: 'Download already exists' }, { status: 400 })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Download check error:', error)
    return NextResponse.json({ error: 'Download check failed' }, { status: 500 })
  }
}
