import { getUser } from '@/db/auth.service'
import { getUserDownloads } from '@/db/downloads.service'
import HistoryView from '@/components/views/history-view'

const Page = async () => {
  const { user } = await getUser()
  const userDownloads = (await getUserDownloads(user?.id || '')) || []

  return <HistoryView userDownloads={userDownloads} />
}

export default Page
