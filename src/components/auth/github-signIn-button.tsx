import { useForm } from 'react-hook-form'
import { LuGithub, LuLoaderCircle } from 'react-icons/lu'

import { signInWithGithub } from '@/actions/handle_auth_action'

import { Button } from '@/components/ui/button'

const GitHubSignInButton = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    await signInWithGithub()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        type="submit"
        className="w-full"
        variant="outline"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
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
