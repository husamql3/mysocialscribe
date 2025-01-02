import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GoHistory } from 'react-icons/go'

const MySpacesBtn = () => {
  return (
    <Link
      href="/history"
      className="flex min-h-7 items-center gap-2"
      prefetch
    >
      <Button
        variant="outline"
        size="sm"
        className="z-50 h-9"
      >
        <GoHistory
          size={16}
          aria-hidden="true"
        />
        <span>My Spaces</span>
      </Button>
    </Link>
  )
}

export default MySpacesBtn
