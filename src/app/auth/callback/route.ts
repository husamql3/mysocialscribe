import { NextResponse } from 'next/server'
import { createClient } from '@/db/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/'

  if (code) {
    try {
      const supabase = await createClient()

      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Code exchange error:', error)
        return NextResponse.redirect('https://mysocialscribe.com/auth/auth-code-error')
      }

      return NextResponse.redirect(`https://mysocialscribe.com${next}`)
    } catch (catchError) {
      console.error('Unexpected error during authentication:', catchError)
      return NextResponse.redirect('https://mysocialscribe.com/auth/auth-code-error')
    }
  }

  return NextResponse.redirect('https://mysocialscribe.com/auth/auth-code-error')
}
