export const formatDate = (date: string, showYear: boolean = true) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  }

  if (showYear) options.year = 'numeric'

  return new Date(date).toLocaleDateString('en-GB', options)
}

export const formatNumber = (number: number, decimals = 0) => {
  if (number < 1000) return number.toString()

  const suffixes = ['', 'K', 'M', 'B', 'T']
  const tier = Math.floor(Math.log10(number) / 3)

  if (tier >= suffixes.length) return number.toString()

  const scaled = number / Math.pow(1000, tier)
  return `${scaled.toFixed(decimals)}${suffixes[tier]}`
}
