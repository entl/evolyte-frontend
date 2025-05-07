import { defineEventHandler, H3Event, readBody, appendHeader, createError } from 'h3'
import { serverApi } from '../utils/serverApi'

export default defineEventHandler (async event => {
  console.log('login.post.ts')
  const api = serverApi(event)
  console.log('api', api)
  const { password, email } = await readBody(event)
  console.log('password', password)
  // create form
  const form = new URLSearchParams()
  form.append('password', password)
  form.append('username', email)


  try {

    // Do the actual request to the external API
    const res = await api.raw('/auth/login', 'POST', {
      body: form,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const cookies = (res?.headers.get('set-cookie') || '').split(',')

    for (const cookie of cookies) {
      appendHeader(event, 'set-cookie', cookie)
    }


    return { message: 'success' }

  } catch (err) {
    throw createError('An error occurred while fetching the data.')
  }

})