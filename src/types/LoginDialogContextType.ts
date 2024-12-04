export type LoginDialogContextType = {
  openLoginDialog: (form?: 'login' | 'signup') => void
  openSignupDialog: () => void
  closeDialog: () => void
}
