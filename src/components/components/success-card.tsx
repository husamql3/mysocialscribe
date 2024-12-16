import Image from 'next/image'
import Link from 'next/link'
import ReactDOM from 'react-dom'
import React, { forwardRef, useRef } from 'react'

import { Confetti, ConfettiRef } from '@/components/ui/confetti'
import { Card, CardContent } from '@/components/ui/card'

type SuccessCardProps = {
  isModal?: boolean
  showLink?: boolean
}

const SuccessCard = forwardRef<HTMLDivElement, SuccessCardProps>(({ showLink, isModal }, ref) => {
  const confettiRef = useRef<ConfettiRef>(null)

  const modalContent = (
    <Card
      ref={ref}
      className="fixed inset-0 z-50 flex w-full max-w-sm flex-col items-center justify-center overflow-auto overflow-y-hidden rounded-lg px-6 pb-4 pt-8 shadow-xl dark:bg-zinc-950"
      onClick={(e) => e.stopPropagation()}
    >
      <Confetti
        ref={confettiRef}
        className="absolute z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({})
        }}
      />

      <Image
        src="/sent.png"
        alt="Success"
        className="pb-5"
        width={80}
        height={80}
        quality={80}
        loading="eager"
      />

      <CardContent className="w-full pb-5 text-center font-semibold dark:text-stone-50">
        Your download is starting now. We&#39;ll send you an email as soon as it&#39;s ready!
      </CardContent>

      {showLink && (
        <div className="z-50 flex w-full justify-center">
          <Link
            href="/"
            className="text-sm text-blue-500 transition duration-200 hover:underline"
          >
            Want to download another space?
          </Link>
        </div>
      )}
    </Card>
  )

  if (!isModal) return modalContent

  return typeof window !== 'undefined' ? ReactDOM.createPortal(modalContent, document.body) : null
})

SuccessCard.displayName = 'SuccessCard'

export default SuccessCard
