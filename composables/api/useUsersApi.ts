export const useUsersApi = () => {
  const {$api} = useNuxtApp();

  const getCurrentUser = async () => {
    try {
      const data = await $api('/users/me', {
        method: 'GET',
      })
      return data
    } catch (error) {
      console.error('Error fetching current user:', error)
      throw error
    }
  }

  return {
    getCurrentUser
  }
}
