import { useForm } from 'react-hook-form'
import { LuLoaderCircle } from 'react-icons/lu'
import { IoLogoGoogle } from 'react-icons/io5'

import { signInWithGoogle } from '@/actions/handle_auth_action'

import { Button } from '@/components/ui/button'

const GoogleSignInButton = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    await signInWithGoogle()
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
