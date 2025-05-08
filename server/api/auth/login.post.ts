export default defineEventHandler(async (event) => {
  try {
    const apiBase = useRuntimeConfig().public.apiBase
    const body = await readBody(event)

    const form = new URLSearchParams()
    form.append('username', body.email)
    form.append('password', body.password)

    const rawResponse = await fetch(apiBase + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
      credentials: 'include',
    })

    const data = await rawResponse.json()

    if (data.access_token && data.refresh_token) {
      setCookie(event, 'access_token', data.access_token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
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

      return {
        status: 'success'
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Internal Server Error'
    })
  }
})
