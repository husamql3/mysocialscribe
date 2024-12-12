// Dependencies: pnpm install lucide-react @remixicon/react

'use client'

import { useRef, useState } from 'react'
import {
  RiFacebookFill,
  RiMailLine,
  RiTelegramLine,
  RiTwitterXFill,
  RiWhatsappLine,
} from '@remixicon/react'
import { Check, Copy } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { createShareableUrl } from '@/utils/createShareableUrl'
import { shareOnSocialMedia } from '@/utils/shareOnSocialMedia'
import { RiLinkedinBoxFill } from 'react-icons/ri'

const TweetShare = ({ spaceUrl }: { spaceUrl: string }) => {
  const [copied, setCopied] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const shareableUrl = createShareableUrl(spaceUrl)

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(shareableUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  //todo add whatsapp share
  //todo add telegram share
  //todo add linkedin share
  //make them work with the shareableUrl

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
          >
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="flex flex-col gap-3 text-center">
            <div className="text-sm font-medium">Share Space Downlaod Link</div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                size="icon"
                variant="outline"
                aria-label="Share on Twitter"
                onClick={() => shareOnSocialMedia('twitter', shareableUrl)}
              >
                <RiTwitterXFill
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Share on Facebook"
                onClick={() => shareOnSocialMedia('facebook', shareableUrl)}
              >
                <RiFacebookFill
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Share on WhatsApp"
                onClick={() => shareOnSocialMedia('whatsapp', shareableUrl)}
              >
                <RiWhatsappLine
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Share on Telegram"
                onClick={() => shareOnSocialMedia('telegram', shareableUrl)}
              >
                <RiTelegramLine
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Share on LinkedIn"
                onClick={() => shareOnSocialMedia('linkedin', shareableUrl)}
              >
                <RiLinkedinBoxFill
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  ref={inputRef}
                  id="input-53"
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
                        className="text-muted-foreground/80 hover:text-foreground focus-visible:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent outline-offset-2 transition-colors focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed"
                        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                        disabled={copied}
                      >
                        <div
                          className={cn(
                            'transition-all',
                            copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                          )}
                        >
                          <Check
                            className="stroke-emerald-500"
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </div>
                        <div
                          className={cn(
                            'absolute transition-all',
                            copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                          )}
                        >
                          <Copy
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </div>
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

export default TweetShare
