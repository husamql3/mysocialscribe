export const shareOnSocialMedia = (platform: string, shareableUrl: string) => {
  const shareTexts: { [key: string]: string } = {
    twitter: `Check out this space: ${shareableUrl}`,
    facebook: `Check out this space: ${shareableUrl}`,
    whatsapp: `Check out this space: ${shareableUrl}`,
    telegram: `Check out this space: ${shareableUrl}`,
    linkedin: `Check out this space: ${shareableUrl}`,
    email: `Check out this space: ${shareableUrl}`,
  }

  const shareUrls: { [key: string]: string } = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTexts.twitter)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTexts.whatsapp)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareableUrl)}&text=${encodeURIComponent(shareTexts.telegram)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableUrl)}`,
    email: `mailto:?subject=Check out this space&body=${encodeURIComponent(shareTexts.email)}`,
  }

  window.open(shareUrls[platform], '_blank')
}
