import { cn } from '@/lib/utils'
import { getUser } from '@/db/supabase/services/auth.service'
import { LoginDialogProvider } from '@/providers/login-dialog-provider'

import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/layout/footer'
import DotPattern from '@/components/ui/dot-pattern'
import Header from '@/components/layout/header'
import AudioPlayer from '@/components/components/audio-player'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const RootView = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getUser()

  return (
    <LoginDialogProvider>
      <NuqsAdapter>
        <Header user={user} />
        {children}
        <Footer />
        <AudioPlayer  />
      </NuqsAdapter>

      <Toaster />
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(250px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]'
        )}
      />
    </LoginDialogProvider>
  )
}
export default RootView
