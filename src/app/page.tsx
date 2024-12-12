import { getUser } from '@/db/auth.service'

import HomeView from '@/components/views/home-view'

const Home = async () => {
  const { user } = await getUser()

  return <HomeView user={user} />
}

export default Home
