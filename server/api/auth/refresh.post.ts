import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async event => {
  const apiBase = useRuntimeConfig().public.apiBase

  const cookies = parseCookies(event)
  const refresh_token = cookies.refresh_token

  if (!refresh_token) {
    throw createError({
      statusCode: 401, 
      statusMessage: 'Unauthorized - No refresh token provided' 
    })
  }

  const response = await fetch(apiBase + '/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw createError({
      statusCode: response.status,
      statusMessage: error.message || 'Failed to refresh token'
    })
  }

  const data = await response.json()

  if (!data.access_token || !data.refresh_token) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid token data received'
    })
  }

  // Set cookies only on successful response
  setCookie(event, 'access_token', data.access_token, {
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 15, // 15 min
  })

  setCookie(event, 'refresh_token', data.refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return { status: 'success' }
})