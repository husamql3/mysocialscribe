'use client'

import { useCallback, useEffect } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'
import { LuCopy } from 'react-icons/lu'

import { PlatformType } from '@/types/PlatformType'
import { createShareableUrl } from '@/utils/createShareableUrl'
import { shareOnSocialMedia } from '@/utils/shareOnSocialMedia'
import { SOCIAL_PLATFORMS } from '@/constants/SOCIAL_PLATFORMS'
import useDeleteDownload from '@/hooks/use-delete-download'
import { toast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ShareComponent = ({
  spaceUrl,
  filename,
  downloadId,
}: {
  spaceUrl: string
  filename: string
  downloadId: string
}) => {
  const { softDeleteDownload, deleteError } = useDeleteDownload()

  useEffect(() => {
    if (deleteError) {
      toast({
        description: deleteError,
        variant: 'destructive',
      })
    }
  }, [deleteError])

  const shareableUrl = createShareableUrl(spaceUrl)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareableUrl)
  }, [shareableUrl])

  return (
    <div className="flex flex-row gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7"
            type="button"
          >
            <HiOutlineDotsVertical className="h-7 w-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Copy Link Button */}
          <DropdownMenuItem
            className="flex items-center justify-between"
            onClick={handleCopy}
          >
            Copy Link
            <LuCopy />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Social Media Share Buttons */}
          {SOCIAL_PLATFORMS.map(({ platform, Icon, label }) => (
            <DropdownMenuItem
              key={platform}
              className="flex items-center justify-between"
              onClick={() => shareOnSocialMedia(platform as PlatformType, shareableUrl)}
            >
              {label}
              <Icon
                size={16}
                aria-hidden="true"
              />
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center justify-between text-red-500"
            onClick={() => softDeleteDownload(downloadId, filename)}
          >
            Delete Tweet
            <AiOutlineDelete className="ml-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ShareComponent
