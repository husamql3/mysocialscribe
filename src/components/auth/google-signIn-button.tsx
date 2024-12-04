import { useFormStatus } from 'react-dom'
import { LuLoader2 } from 'react-icons/lu'
import { IoLogoGoogle } from 'react-icons/io5'

import { signInWithGoogle } from '@/actions/handle_auth_action'

import { Button } from '@/components/ui/button'

const GoogleSignInButton = () => {
  const { pending } = useFormStatus()

  return (
    <form action={signInWithGoogle}>
      <Button
        type="submit"
        className="w-full"
        variant="outline"
        disabled={pending}
      >
        {pending ? (
          <>
            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in with Google...
          </>
        ) : (
          <>
            <IoLogoGoogle />
            <span>Login with Google</span>
          </>
        )}
      </Button>
    </form>
  )
}

export default GoogleSignInButton
