'use client'

import { useCallback, useRef, useState } from 'react'
import { PiShareFatFill } from 'react-icons/pi'

import { cn } from '@/lib/utils'
import { PlatformType } from '@/types/PlatformType'
import { createShareableUrl } from '@/utils/createShareableUrl'
import { shareOnSocialMedia } from '@/utils/shareOnSocialMedia'
import { SOCIAL_PLATFORMS } from '@/constants/SOCIAL_PLATFORMS'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import AnimatedCopyIcon from '@/components/TweetCard/animated-copy-icon'

const ShareComponent = ({ spaceUrl }: { spaceUrl: string }) => {
  const [copied, setCopied] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const shareableUrl = createShareableUrl(spaceUrl)

  const handleCopy = useCallback(() => {
    if (inputRef.current) {
      navigator.clipboard.writeText(shareableUrl)
      setCopied(true)

      const timeoutId = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(timeoutId)
    }
  }, [shareableUrl])

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7"
          >
            <PiShareFatFill className="h-7 w-7" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="flex flex-col gap-3 text-center">
            <div className="text-sm font-medium">Share Space Download Link</div>

            {/* Social Media Share Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {SOCIAL_PLATFORMS.map(({ platform, Icon, label }) => (
                <Button
                  key={platform}
                  size="icon"
                  variant="outline"
                  aria-label={label}
                  onClick={() => shareOnSocialMedia(platform as PlatformType, shareableUrl)}
                >
                  <Icon
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              ))}
            </div>

            {/* URL Copy Input */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  ref={inputRef}
                  id="share-link-input"
                  className="pe-9"
                  type="text"
                  defaultValue={shareableUrl}
                  aria-label="Share link"
                  readOnly
                />
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCopy}
                        className={cn(
                          'absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg',
                          'text-muted-foreground/80 hover:text-foreground focus-visible:text-foreground',
                          'border border-transparent outline-offset-2 transition-colors',
                          'focus-visible:outline-ring/70 focus-visible:outline focus-visible:outline-2',
                          'disabled:pointer-events-none disabled:cursor-not-allowed'
                        )}
                        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                        disabled={copied}
                      >
                        {/* Animated Copy/Check Icons */}
                        <AnimatedCopyIcon copied={copied} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Copy to clipboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ShareComponent
