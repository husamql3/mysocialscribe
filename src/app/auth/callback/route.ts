import { NextResponse } from 'next/server'

import { createClient } from '@/db/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`https://mysocialscribe.com${next}`)
  }

  return NextResponse.redirect('https://mysocialscribe.com/auth/auth-code-error')
}
