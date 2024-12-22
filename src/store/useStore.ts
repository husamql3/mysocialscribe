import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LoadingState = {
  isLoading: boolean
  setLoading: () => void
  setNotLoading: () => void
}

const useLoadingStore = create<LoadingState>()(
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

export default useLoadingStore
