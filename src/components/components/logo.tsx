'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Logo = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div />

  return (
    <Link
      href="/"
      className="w-fit"
    >
      <Image
        src={theme === 'dark' ? '/icon-white.png' : '/icon-black.png'}
        alt="mysocialscribe logo"
        width={100}
        height={100}
        className="aspect-square h-10 w-10 rounded-full object-cover object-center"
      />
    </Link>
  )
}

export default Logo
