import type { RefreshTokenResponse, LoginResponse } from "~/types/auth";

export const useAuthApi = () => {
  const login = async (payload: { email: string; password: string }) => {
    try {
      const res = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: payload,
        credentials: 'include',
      })
      return true
    } catch (error) {
      return false
    }
  }

  const refresh = async () => {
    try { 
      console.log('refresh client api')
      const res = await $fetch<RefreshTokenResponse>('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })
      return true
    } catch (error) {
      return false
    }
  }

  const logout = async () => {
    try {
      console.log('logout client api')
      await $fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      return true
    } catch (error) {
      return false
    }
  }

  return { login, refresh, logout }
}
