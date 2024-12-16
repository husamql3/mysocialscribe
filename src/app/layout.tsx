import clx from 'clsx'
import { Lato } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import RootView from '@/components/views/root-view'
import ThemeProvider from '@/providers/theme-providers'
import HeadMetadata from '@/components/components/head-metadata'

import './globals.css'
import { siteConfig } from '@/config/site'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.GA_MEASUREMENT_ID!
  if (!gaId) console.warn('Missing GA_MEASUREMENT_ID env var')

  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <title>{siteConfig.title}</title>
        <HeadMetadata />
      </head>

      <body className={clx('flex min-h-svh flex-col bg-zinc-50 dark:bg-zinc-950', lato.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
        >
          <RootView>{children}</RootView>
          <GoogleAnalytics gaId={gaId} />
        </ThemeProvider>
      </body>
    </html>
  )
}
