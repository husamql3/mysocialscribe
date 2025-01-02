import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Eye, EyeOff, Loader2, X } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { signupSchema } from '@/types/schema/auth.schema'
import { signup } from '@/db/supabase/services/auth.service'
import { SignupFormData } from '@/types/AuthType'

import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogTitle } from '@/components/ui/dialog'

type SignupFormProps = {
  onLoginClick: () => void
}

const SignUpForm: FC<SignupFormProps> = ({ onLoginClick }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })

  // Watch the password field
  const password = watch('password')

  // Password strength check function
  const checkStrength = (pass: string | undefined) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    ]

    return requirements.map((req) => ({
      met: pass ? req.regex.test(pass) : false,
      text: req.text,
    }))
  }

  // Calculate strength score
  const strength = checkStrength(password)
  const strengthScore = strength.filter((req) => req.met).length

  // Get strength color and text
  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border'
    if (score <= 1) return 'bg-red-500'
    if (score <= 2) return 'bg-orange-500'
    if (score === 3) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  // Password visibility state
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <DialogTitle>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Enter your email below to sign up</CardDescription>
        </CardHeader>
      </DialogTitle>

      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email Input */}
          <div className="group relative">
            <label
              htmlFor="email"
              className="text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium group-has-[:disabled]:opacity-50 dark:bg-zinc-950"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  className="h-10 bg-transparent"
                  aria-invalid={!!errors.email}
                  autoComplete="off"
                />
              )}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="group relative">
            <label
              htmlFor="password"
              className="text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium group-has-[:disabled]:opacity-50 dark:bg-zinc-950"
            >
              Password
            </label>

            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    className="bg-transparent pe-9"
                    type={isVisible ? 'text' : 'password'}
                    aria-invalid={!!errors.password}
                  />
                )}
              />
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOff
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : (
                  <Eye
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}

            {/* Password strength indicator */}
            <div
              className="bg-border mb-4 h-1 w-full overflow-hidden rounded-full"
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={4}
              aria-label="Password strength"
            >
              <div
                className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                style={{ width: `${(strengthScore / 4) * 100}%` }}
              />
            </div>

            {/* Password requirements list */}
            <ul
              className="space-y-1.5 text-xs"
              aria-label="Password requirements"
            >
              {strength.map((req, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2"
                >
                  {req.met ? (
                    <Check
                      size={16}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <X
                      size={16}
                      className="text-muted-foreground/80"
                      aria-hidden="true"
                    />
                  )}
                  <span className={`${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                    {req.text}
                    <span className="sr-only">
                      {req.met ? ' - Requirement met' : ' - Requirement not met'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || strengthScore < 4 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              'Sign up'
            )}
          </Button>
        </form>

        {/* Switch to log in form link */}
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <span
            onClick={onLoginClick}
            className="cursor-pointer underline transition-colors hover:text-blue-600"
          >
            Login
          </span>
        </div>
      </CardContent>
    </>
  )
}

export default SignUpForm
