import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GoHistory } from 'react-icons/go'

const MySpacesBtn = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="z-50 h-9"
    >
      <Link
        href="/history"
        className="flex min-h-7 items-center gap-2"
      >
        <GoHistory
          size={16}
          aria-hidden="true"
        />
        <span>My Spaces</span>
      </Link>
    </Button>
  )
}

export default MySpacesBtn
