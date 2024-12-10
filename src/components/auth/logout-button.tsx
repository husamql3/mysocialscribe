'use client'

import { useForm } from 'react-hook-form'
import { LogOut } from 'lucide-react'

import { logout } from '@/actions/handle_auth_action'

import { Button } from '@/components/ui/button'

const LogoutButton = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    await logout()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-xl"
        disabled={isSubmitting}
      >
        <LogOut />
      </Button>
    </form>
  )
}

export default LogoutButton
