import { Check, Copy } from 'lucide-react'

import { cn } from '@/lib/utils'

const AnimatedCopyIcon = ({ copied }: { copied: boolean }) => (
  <>
    <div className={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
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
  </>
)

export default AnimatedCopyIcon
