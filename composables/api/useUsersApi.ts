import type { UserCreate, UserResponse, UserUpdate } from '~/types/api/user';

type ApiResult<T = unknown> = {
  data?: T;
  error?: string;
};

export const useUsersApi = () => {
  const { $api } = useNuxtApp();

  // Get all users
  const getAllUsers = async (): Promise<ApiResult<UserResponse[]>> => {
    try {
      const data = await $api<UserResponse[]>('/users', { method: 'GET' });
      return { data };
    } catch (error: any) {
      return { error: error?.message || 'Failed to fetch users' };
    }
  };

  // Get current user
  const getCurrentUser = async (): Promise<ApiResult<UserResponse>> => {
    try {
      console.log('Fetching current user');
      const data = await $api<UserResponse>('/users/me', { method: 'GET' });
      return { data };
    } catch (error: any) {
      return { error: error?.message || 'Failed to fetch current user' };
    }
  };

  // Get user by ID
  const getUserById = async (userId: number): Promise<ApiResult<UserResponse>> => {
    try {
      const data = await $api<UserResponse>(`/users/${userId}`, { method: 'GET' });
      return { data };
    } catch (error: any) {
      return { error: error?.message || 'Failed to fetch user by ID' };
    }
  };

  // Register (create) user
  const createUser = async (user: UserCreate): Promise<ApiResult<UserResponse>> => {
    try {
      const data = await $api<UserResponse>('/users', { method: 'POST', body: user });
      return { data };
    } catch (error: any) {
      return { error: error?.message || 'Failed to create user' };
    }
  };

  // Update user
  const updateUser = async (user: UserUpdate): Promise<ApiResult<UserResponse>> => {
    try {
      const data = await $api<UserResponse>('/users', { method: 'PATCH', body: user });
      return { data };
    } catch (error: any) {
      return { error: error?.message || 'Failed to update user' };
    }
  };

  // Delete user
  const deleteUser = async (userId: string | number): Promise<ApiResult<void>> => {
    try {
      await $api<void>(`/users/${userId}`, { method: 'DELETE' });
      return { data: undefined };
    } catch (error: any) {
      return { error: error?.message || 'Failed to delete user' };
    }
  };

  return {
    getAllUsers,
    getCurrentUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};
