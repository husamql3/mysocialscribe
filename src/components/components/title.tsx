import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'

export default function Title() {
  return (
    <div className="max-w-4xl px-4 pt-4 text-center sm:pt-0">
      <HeroHighlight className="text-lg font-semibold leading-snug text-neutral-700 dark:text-white md:text-3xl lg:leading-tight">
        Your AI Assistant for Twitter Spaces
      </HeroHighlight>

      <p className="mt-3 text-xl font-semibold leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-3xl lg:leading-snug">
        <Highlight className="text-black dark:text-white">
          Download, Transcribe, Summarize
        </Highlight>{' '}
        all in one place.
      </p>
    </div>
  )
}
