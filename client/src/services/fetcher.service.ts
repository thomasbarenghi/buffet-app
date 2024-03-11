import { serverUrl } from '@/utils/constants/env.const'

export const fetcher = async (url: string): Promise<string> => {
  const response = await fetch(`${serverUrl}${url}`)

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  return await response.json()
}
