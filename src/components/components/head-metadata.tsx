import { siteConfig } from '@/config/site'

const HeadMetadata = () => {
  return (
    <>
      <link
        rel="icon"
        href="/favicon.ico"
        type="image/png"
      />
      <meta
        property="og:title"
        content={siteConfig.title}
      />
      <meta
        property="og:image"
        content={`${siteConfig.url}${siteConfig.ogImage}`}
      />
      <meta
        property="og:image:width"
        content="1200"
      />
      <meta
        property="og:image:height"
        content="630"
      />
      <meta
        property="og:image:alt"
        content="MySocialScribe - Twitter Spaces Transcription"
      />
      <meta
        property="og:image:type"
        content="image/png"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:image"
        content={`${siteConfig.url}${siteConfig.ogImage}`}
      />
      <meta
        name="theme-color"
        content="#18181B"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
    </>
  )
}
export default HeadMetadata
