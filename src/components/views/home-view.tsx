import { User } from '@supabase/auth-js'

import Title from '@/components/components/title'
import Download from '@/components/components/download'
import { CardStackComponent } from '@/components/components/card-stack-component'

const HomeView = ({ user }: { user: User | null }) => {
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center gap-8">
      <Title />
      <Download user={user} />
      <CardStackComponent />
    </main>
  )
}

export default HomeView
