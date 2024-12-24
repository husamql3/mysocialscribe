import { cn } from '@/lib/utils'

const Hr = ({ className }: { className?: string }) => {
  return (
    <hr
      className={cn(
        'z-50 m-0 h-0.5 w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0',
        className
      )}
    />
  )
}

export default Hr
