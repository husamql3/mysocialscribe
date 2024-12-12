'use server'

import { User } from '@supabase/auth-js'

import { createClient } from '@/db/supabase/server'

export const getUser = async (): Promise<{ user: User | null }> => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { user }
}
