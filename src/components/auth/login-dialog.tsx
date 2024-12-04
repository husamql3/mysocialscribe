'use client'

import React, { useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import SignupForm from '@/components/auth/signup-form'
import LoginForm from '@/components/auth/login-form'

const LoginDialog = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <HoverBorderGradient
          containerClassName="rounded-xl"
          as="button"
          className="flex items-center bg-white px-2 py-1 text-sm text-black dark:bg-black dark:text-white md:px-3"
        >
          Login
        </HoverBorderGradient>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isLoginForm ? (
          <LoginForm onSignupClick={toggleForm} />
        ) : (
          <SignupForm onLoginClick={toggleForm} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
