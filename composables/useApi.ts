import { H3Event } from 'h3'
import Client from '~/utils/api/client'

// server composable for calling the external API through Nitro Server
export const useApi = () => {
  const { apiUrl } = useRuntimeConfig().public

  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')

  const client = new Client(apiUrl as string, {
    headers: {
      'access_token': `Bearer ${accessToken.value}`,
      'refresh_token': `Bearer ${refreshToken.value}`,
    } as HeadersInit
  })

  return client
}