'use client'

import { History } from 'lucide-react'

import { useDownload } from '@/hooks/use-download'
import { useLoadingStore } from '@/store/useStore'
import { TweetDownloadAgainBtnType } from '@/types/TweetCardType'

import { Button } from '@/components/ui/button'
import { LuLoaderCircle } from 'react-icons/lu'

const TweetDownloadAgainBtn = ({
  tweetUrl,
  email,
  user_id,
  isDownloading,
  downloadId,
}: TweetDownloadAgainBtnType) => {
  const { downloadTwitterSpaces } = useDownload()
  const isLoading = useLoadingStore((state) => state.isLoading)
  const setNotLoading = useLoadingStore((state) => state.setNotLoading)
  const setLoading = useLoadingStore((state) => state.setLoading)
  // const confettiRef = useRef<ConfettiRef>(null)
  // const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDownloadAgain = async () => {
    setLoading()

    try {
      await downloadTwitterSpaces({
        url: tweetUrl,
        userId: user_id,
        email: email,
        downloadId: downloadId,
      })
    } catch (error) {
      console.error('Error downloading space:', error)
    } finally {
      setNotLoading()
    }
  }

  return (
    <>
      {isLoading ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 text-stone-50"
          disabled
        >
          Downloading
          <LuLoaderCircle className="h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          onClick={handleDownloadAgain}
          disabled={isDownloading}
          className="h-7"
          type="button"
        >
          <History className="h-5 w-5" />
          <span>Download Again</span>
        </Button>
      )}

      {/* Success Modal */}
      {/*<Dialog*/}
      {/*  open={isModalOpen}*/}
      {/*  onOpenChange={setIsModalOpen}*/}
      {/*>*/}
      {/*  <DialogContent className="flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg px-6 pb-4 pt-8 dark:bg-zinc-950">*/}
      {/*    <Confetti*/}
      {/*      ref={confettiRef}*/}
      {/*      className="absolute z-0 size-full"*/}
      {/*      onMouseEnter={() => {*/}
      {/*        confettiRef.current?.fire({})*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <Image*/}
      {/*      src="/sent.png"*/}
      {/*      alt="Success"*/}
      {/*      className="pb-5"*/}
      {/*      width={80}*/}
      {/*      height={80}*/}
      {/*      quality={80}*/}
      {/*      loading="eager"*/}
      {/*    />*/}
      {/*    <DialogTitle className="sr-only">*/}
      {/*      <span className="sr-only">Success!</span>*/}
      {/*    </DialogTitle>*/}
      {/*    <DialogDescription className="w-full pb-5 text-center font-semibold dark:text-stone-50">*/}
      {/*      Your download is starting now. We&#39;ll send you an email as soon as it&#39;s ready!*/}
      {/*    </DialogDescription>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}
    </>
  )
}

export default TweetDownloadAgainBtn
