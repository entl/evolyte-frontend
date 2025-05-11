export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie('access_token')

  // Optionally decode and check expiration
  const isExpired = () => {
    try {
      const payload = JSON.parse(atob(accessToken.value.split('.')[1]))
      return payload.exp < Math.floor(Date.now() / 1000)
    } catch {
      return true
    }
  }


  if (!accessToken.value) {
    return navigateTo('/login')
  }

  if (isExpired()) {
    return navigateTo('/login')
  }
})
