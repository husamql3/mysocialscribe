import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LoadingState = {
  isLoading: boolean
  setLoading: () => void
  setNotLoading: () => void
}

export const useLoadingStore = create<LoadingState>()(
  persist(
    (set) => ({
      isLoading: false,
      setLoading: () => set({ isLoading: true }),
      setNotLoading: () => set({ isLoading: false }),
    }),
    {
      name: 'loading-storage',
    }
  )
)

type ModalState = {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      isModalOpen: false,
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),
      toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
    }),
    {
      name: 'modal-storage',
    }
  )
)
