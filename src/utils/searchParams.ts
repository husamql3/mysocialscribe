import {
  createSearchParamsCache,
  createSerializer,
  parseAsBoolean,
  parseAsString,
} from 'nuqs/server'

export const searchParams = {
  audioPlayer: parseAsBoolean.withDefault(false),
  spaceSrc: parseAsString.withDefault(''),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
export const serialize = createSerializer(searchParams)
