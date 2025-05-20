import type { TokenPairResponse } from "~/types/api/auth";
import type ErrorResponse from "~/types/api/error";


type LoginPayload = { email: string; password: string };

type ApiResult<T = unknown, E = ErrorResponse> = {
  data?: T;
  error?: E;
};

export const useAuthApi = () => {
  const login = async (payload: LoginPayload): Promise<ApiResult<TokenPairResponse>> => {
    try {
      const res = await $fetch<TokenPairResponse>('/api/auth/login', {
        method: 'POST',
        body: payload,
        credentials: 'include',
      });
      return { data: res };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  const refresh = async (): Promise<ApiResult<TokenPairResponse>> => {
    try { 
      const res = await $fetch<TokenPairResponse>('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      return { data: res };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  const logout = async (): Promise<ApiResult> => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      return { data: {} };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  return { login, refresh, logout };
};
