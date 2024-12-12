import HomeView from '@/components/views/home-view'

import { createClient } from '@/db/supabase/server'

const Home = async () => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  return <HomeView user={user} />
}

export default Home
