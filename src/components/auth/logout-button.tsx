import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { logout } from '@/actions/handle_auth_action'

const LogoutButton = () => {
  return (
    <form>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-xl"
        formAction={logout}
      >
        <LogOut />
      </Button>
    </form>
  )
}

export default LogoutButton
