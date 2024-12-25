'use client'

import { useCallback } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { LuCopy } from 'react-icons/lu'

import { SOCIAL_PLATFORMS } from '@/constants/SOCIAL_PLATFORMS'
import { useDeleteDownload } from '@/hooks/use-delete'
import { PlatformType } from '@/types/PlatformType'
import { createShareableUrl } from '@/utils/createShareableUrl'
import { shareOnSocialMedia } from '@/utils/shareOnSocialMedia'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ShareComponent = ({ spaceUrl, downloadId }: { spaceUrl: string; downloadId: string }) => {
  const { softDelete, isSoftDeleting } = useDeleteDownload()

  const shareableUrl = createShareableUrl(spaceUrl)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareableUrl)
  }, [shareableUrl])

  const handleDelete = async (downloadId: string) => {
    await softDelete(downloadId)
  }

  return (
    <div className="flex flex-row gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          disabled={isSoftDeleting}
        >
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
            onClick={() => handleDelete(downloadId)}
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
