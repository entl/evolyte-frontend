import type { LoginResponse } from "~/types/api/auth"

export default defineOAuthGoogleEventHandler({
  config: {
    redirectURL: "http://localhost:3000/auth/google",
    authorizationParams: { access_type: 'offline' }
  },
  async onSuccess(event, { user, tokens }) {
    // console.log("google user: ", user)
    // console.log("google tokens: ", tokens)
    // console.log("google event: ", event)
    // console.log("google event: ", event.node.req.headers)

    const body = JSON.stringify({
      user: {
        sub: user.sub,
        name: user.name,
        given_name: user.given_name,
        family_name: user.family_name,
        picture: user.picture,
        email: user.email,
        email_verified: user.email_verified,
      },
      tokens: {
        access_token: tokens.access_token,
        expires_in: tokens.expires_in,
        id_token: tokens.id_token,
        scope: tokens.scope,
        token_type: tokens.token_type,
      }
    })

    console.log("google body: ", body)

    try {
      const res = await fetch('http://localhost:8001/api/v1/auth/google/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }
      )

      console.log("google res: ", res)

      if (!res.ok) {
        throw new Error('Failed to login with Google')
      }

      const data = await res.json()

      setCookie(event, 'access_token', data.access_token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15 * 60, // 15 min
      })

      setCookie(event, 'refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      console.log("google res: ", res)
      console.log("google res: ", data)
      return sendRedirect(event, '/app/dashboard')
    } catch (error) {
      console.error('Error during Google login API call:', error)
      throw error
    }
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})