import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

const Page = () => {
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center gap-8 p-6">
      <Card className="z-50 flex w-full max-w-sm flex-col items-center justify-center rounded-lg px-6 pb-4 pt-8 shadow-xl dark:bg-zinc-950">
        <Image
          src="/sent.png"
          alt="Success"
          className="pb-5"
          width={80}
          height={80}
          quality={80}
        />

        <CardContent className="w-full pb-5 text-center font-semibold dark:text-stone-50">
          Your download is starting now. We’ll send you an email as soon as it’s ready!
        </CardContent>

        <div className="flex w-full justify-center">
          <Link
            href="/"
            className="text-sm text-blue-500 transition duration-200 hover:underline"
          >
            Want to download another space?
          </Link>
        </div>
      </Card>
    </main>
  )
}

export default Page
