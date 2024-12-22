import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LoadingState = {
  status: 'stale' | 'loading'
  setLoading: () => void
  setStale: () => void
}

const useLoadingStore = create<LoadingState>()(
  persist(
    (set) => ({
      status: 'stale',
      setLoading: () => set({ status: 'loading' }),
      setStale: () => set({ status: 'stale' }),
    }),
    {
      name: 'loading-storage',
    }
  )
)

export default useLoadingStore
