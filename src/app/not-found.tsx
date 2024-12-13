import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="z-50 flex h-full flex-1 flex-col items-center justify-center gap-2 sm:gap-3">
      <p className="text-3xl font-semibold tracking-tight sm:text-5xl">Page not found</p>

      <Link
        href="/"
        className="text-blue-500 transition duration-200 hover:underline"
      >
        Return Home
      </Link>
    </div>
  )
}

export default NotFound
