'use server'

import { Download, PrismaClient, STATUS } from '@prisma/client'

import { DownloadParams, DownloadResult, UpdateOrInsertDownload } from '@/types/PrismaDownloadType'

const prisma = new PrismaClient() as PrismaClient

export const updateOrInsertDownload = async ({
  data,
  downloadId,
}: UpdateOrInsertDownload): Promise<Download> => {
  try {
    if (downloadId) {
      return await prisma.download.update({
        where: { id: downloadId },
        data,
      })
    }

    return await prisma.download.create({
      data: data as Partial<Download>,
    })
  } catch (error) {
    console.error('Error updating/inserting download record:', error)
    throw error
  }
}

export const download = async ({
  spaceUrl,
  userId,
  downloadId,
}: DownloadParams): Promise<DownloadResult> => {
  const existingDownload = await findDownloadBySpaceUrl(spaceUrl)

  if (existingDownload?.filename) {
    const data = {
      userId: userId,
      filename: existingDownload.filename,
      spaceUrl: spaceUrl,
      status: STATUS.completed,
      isDeleted: false,
      isArchived: false,
    }

    const download = await updateOrInsertDownload({ data, downloadId })
    return { download, startDownloading: false }
  }

  if (downloadId) {
    const download = await updateOrInsertDownload({
      data: {
        status: STATUS.pending,
        isDeleted: false,
        isArchived: false,
      },
      downloadId,
    })
    return { download, startDownloading: true }
  }

  const download = await updateOrInsertDownload({
    data: {
      userId: userId,
      spaceUrl: spaceUrl,
      status: STATUS.pending,
      isDeleted: false,
      isArchived: false,
    },
  })
  return { download, startDownloading: true }
}

/**
 * findDownloadBySpaceUrl - Find a download record by spaceUrl
 * @param {string} spaceUrl - The spaceUrl to search for
 * @returns {Promise<Download | null>} - The download record if found, null otherwise
 **/
export const findDownloadBySpaceUrl = async (spaceUrl: string): Promise<Download | null> => {
  try {
    return prisma.download.findFirst({ where: { spaceUrl } })
  } catch (error) {
    console.error('Error finding download by spaceUrl:', error)
    throw error
  }
}

/**
 * findDownloadById - Find a download record by id
 * @param {string} id - The id to search for
 * @returns {Promise<Download | null>} - The download record if found, null otherwise
 **/
export const findDownloadById = async (id: string): Promise<Download | null> => {
  try {
    return prisma.download.findUnique({ where: { id } })
  } catch (error) {
    console.error('Error finding download by id:', error)
    throw error
  }
}

/**
 * findIfDownloadExists - Check if a download record exists
 * @param {string} userId - The user id to search for
 * @param {string} spaceUrl - The spaceUrl to search for
 * @returns {Promise<boolean>} - True if the download record exists, false otherwise
 **/
export const findIfDownloadExists = async (userId: string, spaceUrl: string): Promise<boolean> => {
  try {
    const download = await prisma.download.findFirst({
      where: {
        userId,
        spaceUrl,
      },
    })
    return !!download
  } catch (error) {
    console.error('Error finding if download exists:', error)
    throw error
  }
}

/**
 * findDownloads - Find all download records for a user
 * @param {string} userId - The user id to search for
 * @returns {Promise<Download[]>} - An array of download records
 **/
export const findDownloads = async (userId: string): Promise<Download[]> => {
  try {
    return prisma.download.findMany({
      where: { userId, isArchived: false },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error finding downloads:', error)
    throw error
  }
}

/**
 * findRecentDownloads - Find all recent download records
 * @returns {Promise<Download[]>} - An array of download records
 **/
export const findRecentDownloads = async (): Promise<Download[]> => {
  const twoDaysAgo = new Date()
  twoDaysAgo.setHours(twoDaysAgo.getHours() - 48)

  try {
    return prisma.download.findMany({
      where: {
        createdAt: { gte: twoDaysAgo },
        filename: { not: null },
      },
      distinct: ['filename'],
      orderBy: [{ createdAt: 'desc' }],
    })
  } catch (error) {
    console.error('Error finding recent downloads:', error)
    throw error
  }
}

/**
 * softDeleteDownload - Soft delete a download record
 * @param {string} id - The id of the download record to soft delete
 * @returns {Promise<void>}
 **/
export const softDeleteDownload = async (id: string): Promise<void> => {
  try {
    await prisma.download.update({
      where: { id },
      data: { isDeleted: true, filename: null, status: 'pending' },
    })
  } catch (error) {
    console.error('Error soft deleting download:', error)
    throw error
  }
}

/**
 * hardDeleteDownload - Hard delete a download record
 * @param {string} id - The id of the download record to hard delete
 * @returns {Promise<void>}
 **/
export const hardDeleteDownload = async (id: string): Promise<void> => {
  try {
    await prisma.download.update({
      where: { id },
      data: {
        isArchived: true,
        isDeleted: true,
        filename: null,
        status: 'pending',
      },
    })
  } catch (error) {
    console.error('Error hard deleting download:', error)
    throw error
  }
}

/**
 * clearDownloadFiles - Clear all download files
 * @returns {Promise<void>}
 **/
export const clearDownloadFiles = async (): Promise<void> => {
  try {
    await prisma.download.updateMany({
      where: { filename: { not: null } },
      data: { filename: null, isDeleted: true },
    })
  } catch (error) {
    console.error('Error removing cache:', error)
    throw error
  }
}

/**
 * disconnect - Disconnect from the database and exit the process
 **/
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
