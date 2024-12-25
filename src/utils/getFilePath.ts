import path from 'path'

export const getFilePath = (filename: string) => {
  return path.join(process.cwd(), 'public', 'downloads', filename)
}
