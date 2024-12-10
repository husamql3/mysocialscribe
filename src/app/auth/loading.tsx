import { LuLoaderCircle } from 'react-icons/lu'

const Loading = () => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <LuLoaderCircle className="z-50 animate-spin text-5xl text-blue-700" />
    </div>
  )
}

export default Loading
