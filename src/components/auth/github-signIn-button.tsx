import { useFormStatus } from 'react-dom'
import { LuGithub, LuLoader2 } from 'react-icons/lu'

import { signInWithGithub } from '@/actions/handle_auth_action'

import { Button } from '@/components/ui/button'

const GitHubSignInButton = () => {
  const { pending } = useFormStatus()

  return (
    <form action={signInWithGithub}>
      <Button
        type="submit"
        className="w-full"
        variant="outline"
        disabled={pending}
      >
        {pending ? (
          <>
            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in with Github...
          </>
        ) : (
          <>
            <LuGithub />
            <span>Login with Github</span>
          </>
        )}
      </Button>
    </form>
  )
}

export default GitHubSignInButton
