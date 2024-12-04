'use client'

import { createContext, useCallback, useContext, useState, FC, ReactNode } from 'react'

import { LoginDialogContextType } from '@/types/LoginDialogContextType'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import SignupForm from '@/components/auth/signup-form'
import LoginForm from '@/components/auth/login-form'

type FormType = 'login' | 'signup'

const LoginDialogContext = createContext<LoginDialogContextType | undefined>(undefined)

export const LoginDialogProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentForm, setCurrentForm] = useState<FormType>('login')

  const openLoginDialog = useCallback((form: FormType = 'login') => {
    setCurrentForm(form)
    setIsOpen(true)
  }, [])

  const openSignupDialog = useCallback(() => {
    openLoginDialog('signup')
  }, [openLoginDialog])

  const closeDialog = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <LoginDialogContext.Provider
      value={{
        openLoginDialog,
        openSignupDialog,
        closeDialog,
      }}
    >
      {children}
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          {currentForm === 'login' ? (
            <LoginForm onSignupClick={() => setCurrentForm('signup')} />
          ) : (
            <SignupForm onLoginClick={() => setCurrentForm('login')} />
          )}
        </DialogContent>
      </Dialog>
    </LoginDialogContext.Provider>
  )
}

export const useLoginDialog = () => {
  const context = useContext(LoginDialogContext)
  if (!context) {
    throw new Error('useLoginDialog must be used within a LoginDialogProvider')
  }
  return context
}
