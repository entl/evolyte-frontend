import { H3Event } from 'h3'
import Client from '~/utils/api/client'

// server composable for calling the external API through Nitro Server
export const serverApi = (event: H3Event) => {
  const apiUrl = useRuntimeConfig().public.apiBase 

  const accessToken = getCookie(event, 'access_token')
  const refreshToken = getCookie(event, 'refresh_token')

  const client = new Client(apiUrl as string, {
    headers: {
      'access_token': `Bearer ${accessToken}`,
      'refresh_token': `Bearer ${refreshToken}`,
    } as HeadersInit
  })

  return client
}