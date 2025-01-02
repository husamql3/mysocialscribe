'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuLoaderCircle } from 'react-icons/lu'

import { loginSchema } from '@/types/schema/auth.schema'
import { LoginFormData } from '@/types/AuthType'

import { useLoginDialog } from '@/providers/login-dialog-provider'
import { login } from '@/db/supabase/services/auth.service'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogTitle } from '@/components/ui/dialog'
import GitHubSignInButton from '@/components/auth/github-signIn-button'
import GoogleSignInButton from '@/components/auth/google-signIn-button'

type LoginFormProps = {
  onSignupClick: () => void
}

const LoginForm: FC<LoginFormProps> = ({ onSignupClick }) => {
  const { closeDialog } = useLoginDialog()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    const result = await login(formData)
    if (result && !result.success) {
      setError('root', {
        type: 'manual',
        message: result.error || 'Login failed',
      })
      return
    }

    closeDialog()
  }

  return (
    <>
      <DialogTitle>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login</CardDescription>
        </CardHeader>
      </DialogTitle>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 pb-3"
        >
          {/* Email Input */}
          <div className="group relative">
            <label
              htmlFor="login-email"
              className="text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium group-has-[:disabled]:opacity-50 dark:bg-zinc-950"
            >
              Email
            </label>
            <Input
              id="login-email"
              type="email"
              className="h-10 bg-transparent"
              aria-invalid={!!errors.email}
              autoComplete="off"
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="group relative">
            <label
              htmlFor="login-password"
              className="text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium group-has-[:disabled]:opacity-50 dark:bg-zinc-950"
            >
              Password
            </label>
            <Input
              id="login-password"
              type="password"
              className="h-10 bg-transparent"
              aria-invalid={!!errors.password}
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {errors.root && <div className="text-sm text-red-500">{errors.root.message}</div>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>

        <div className="space-y-3">
          <GitHubSignInButton />
          <GoogleSignInButton />
        </div>

        {/* Switch to Signup */}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <span
            onClick={onSignupClick}
            className="cursor-pointer underline transition-colors hover:text-blue-600"
          >
            Sign up
          </span>
        </div>
      </CardContent>
    </>
  )
}

export default LoginForm
