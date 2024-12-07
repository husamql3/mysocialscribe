import { createClient } from '@/db/supabase/server'

import Title from '@/components/components/title'
import Download from '@/components/components/download'
import { CardStackComponent } from '@/components/components/card-stack-component'
import { Button } from '@/components/ui/button'
import { Download as DL } from 'lucide-react'

const Home = async () => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  return (
    <main className="flex h-56 flex-1 flex-col items-center justify-center gap-8">
      <Title />
      <DlBtn />
      <Download user={user} />
      <CardStackComponent />
    </main>
  )
}

export default Home

export function DlBtn() {
  return (
    <Button
      asChild
      className="flex items-center gap-2"
    >
      <a
        href="/downloads/twitter_space_98aed5a5.mp3"
        download="twitter_space_98aed5a5.mp3"
      >
        <DL className="h-4 w-4" />
        Download MP3
      </a>
    </Button>
  )
}
