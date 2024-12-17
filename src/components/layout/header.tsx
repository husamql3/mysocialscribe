import { User } from '@supabase/auth-js'

import Logo from '@/components/components/logo'
import UserProfile from '@/components/auth/user-profile'
import LoginDialog from '@/components/auth/login-dialog'
import Hr from '@/components/components/hr'

const Header = ({ user }: { user: User | null }) => {
  return (
    <>
      <header className="relative py-4 pb-4">
        <div className="container mx-auto flex max-w-3xl items-center justify-between px-4 md:px-1">
          <Logo />

          {user && <UserProfile user={user} />}
          {!user && <LoginDialog />}
        </div>
      </header>

      <Hr />
    </>
  )
}

export default Header
