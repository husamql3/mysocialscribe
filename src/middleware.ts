import { NextRequest } from 'next/server'

import { updateSession } from '@/db/supabase/middleware'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  // Set a custom header for the dark theme
  response.headers.set('theme', 'dark')
  return response
}

export const config = {
  matcher: [
    '/history/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
