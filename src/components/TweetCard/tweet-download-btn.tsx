'use client'

import { HiDownload } from 'react-icons/hi'
import { User } from '@supabase/auth-js'

import { useDownload } from '@/hooks/useDownload'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type TweetDownloadBtnProps = {
  filename?: string
  tweetUrl: string
  user: User
}

const TweetDownloadBtn = ({ filename, tweetUrl, user }: TweetDownloadBtnProps) => {
  const { downloadTwitterSpaces } = useDownload()

  const handleDownload = async () => {
    await downloadTwitterSpaces({
      url: tweetUrl,
      userId: user.id,
      email: user.email!,
    })
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(filename ? 'h-7 w-7' : '')}
      onClick={handleDownload}
    >
      {filename ? <HiDownload className="h-5 w-5" /> : 'Download Again'}
    </Button>
  )
}

export default TweetDownloadBtn
