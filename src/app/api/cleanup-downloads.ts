// import { NextApiRequest, NextApiResponse } from 'next'
// import { unlink } from 'fs/promises'
// import cron from 'node-cron'
// import path from 'path'
//
// import { createClient } from '@/db/supabase/client'
//
// const supabase = createClient()
//
// async function cleanupDownloads() {
//   try {
//     const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
//
//     // Fetch downloads older than 24 hours
//     const { data: oldDownloads, error } = await supabase
//       .from('downloads')
//       .select('*')
//       .lt('created_at', twentyFourHoursAgo.toISOString())
//     if (error) throw error
//
//     for (const download of oldDownloads) {
//       const filePath = path.join(process.cwd(), 'public', 'downloads', download.filename)
//
//       // Delete file from local storage
//       try {
//         await unlink(filePath)
//       } catch (unlinkError) {
//         console.error(`Error deleting local file ${download.filename}:`, unlinkError)
//       }
//     }
//
//     console.log('Cleanup completed successfully')
//   } catch (error) {
//     console.error('Cleanup error:', error)
//   }
// }
//
// // Schedule the cleanup task to run every 24 hours
// cron.schedule('0 * * * *', cleanupDownloads)
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     await cleanupDownloads()
//     res.status(200).json({ message: 'Cleanup task executed' })
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }
