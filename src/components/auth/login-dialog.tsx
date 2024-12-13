'use client'

import React, { useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import SignupForm from '@/components/auth/signup-form'
import LoginForm from '@/components/auth/login-form'
import { Button } from '@/components/ui/moving-border'

const LoginDialog = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
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
