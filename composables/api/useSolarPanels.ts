import type ErrorResponse from '~/types/api/error';
import type {
  SolarPanelCreate,
  SolarPanelUpdate,
  SolarPanelResponse,
  ClusteredSolarPanelsResponse,
  PanelStatusEnum,
} from '~/types/api/solarPanels';

import parseApiError from '~/utils/parseApiError';

type ApiResult<T = unknown, E = ErrorResponse> = {
  data?: T;
  error?: E;
};

export const useSolarPanelsApi = () => {
  const { $api } = useNuxtApp();

  // Create a single solar panel
  const createSolarPanel = async (panel: SolarPanelCreate): Promise<ApiResult<SolarPanelResponse>> => {
    try {
      const data = await $api<SolarPanelResponse>('/solar-panels', { method: 'POST', body: panel });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Create solar panels in bulk
  const createSolarPanelsBulk = async (panels: SolarPanelCreate[]): Promise<ApiResult<SolarPanelResponse[]>> => {
    try {
      const data = await $api<SolarPanelResponse[]>('/solar-panels/bulk', { method: 'POST', body: panels });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // List all solar panels
  const listSolarPanels = async (): Promise<ApiResult<SolarPanelResponse[]>> => {
    try {
      const data = await $api<SolarPanelResponse[]>('/solar-panels', { method: 'GET' });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Update a solar panel
  const updateSolarPanel = async (panelId: number, panel: SolarPanelUpdate): Promise<ApiResult<SolarPanelResponse>> => {
    try {
      const data = await $api<SolarPanelResponse>(`/solar-panels/${panelId}`, { method: 'PUT', body: panel });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Get solar panels by user
  const getUserSolarPanels = async (userId: number): Promise<ApiResult<SolarPanelResponse[]>> => {
    try {
      const data = await $api<SolarPanelResponse[]>(`/solar-panels/user/${userId}`, { method: 'GET' });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Get solar panels by status
  const getSolarPanelsByStatus = async (status: PanelStatusEnum): Promise<ApiResult<SolarPanelResponse[]>> => {
    try {
      const data = await $api<SolarPanelResponse[]>(`/solar-panels/status/${status}`, { method: 'GET' });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Get nearby solar panels
  const getNearbySolarPanels = async (lat: number, lon: number, radius: number): Promise<ApiResult<SolarPanelResponse[]>> => {
    try {
      const params = new URLSearchParams({ lat: lat.toString(), lon: lon.toString(), radius: radius.toString() });
      const data = await $api<SolarPanelResponse[]>(`/solar-panels/nearby?${params}`, { method: 'GET' });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Get clustered solar panels
  const getClusteredSolarPanels = async (
    min_lat: number, max_lat: number, min_lon: number, max_lon: number, zoom_level: number
  ): Promise<ApiResult<ClusteredSolarPanelsResponse>> => {
    try {
      const params = new URLSearchParams({
        min_lat: min_lat.toString(),
        max_lat: max_lat.toString(),
        min_lon: min_lon.toString(),
        max_lon: max_lon.toString(),
        zoom_level: zoom_level.toString(),
      });
      const data = await $api<ClusteredSolarPanelsResponse>(`/solar-panels/clustered?${params}`, { method: 'GET' });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Get panels in bounds
  const getPanelsInBounds = async (
    min_lat: number, max_lat: number, min_lon: number, max_lon: number
  ): Promise<ApiResult<SolarPanelResponse[]>> => {
    try {
      const params = new URLSearchParams({
        min_lat: min_lat.toString(),
        max_lat: max_lat.toString(),
        min_lon: min_lon.toString(),
        max_lon: max_lon.toString(),
      });
      const data = await $api<SolarPanelResponse[]>(`/solar-panels/bounds?${params}`, { method: 'GET' });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Delete a solar panel
  const deleteSolarPanel = async (panelId: number): Promise<ApiResult<void>> => {
    try {
      await $api(`/solar-panels/${panelId}`, { method: 'DELETE' });
      return { data: undefined };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  // Get a single solar panel by ID
  const getSolarPanel = async (panelId: number): Promise<ApiResult<SolarPanelResponse>> => {
    try {
      const data = await $api<SolarPanelResponse>(`/solar-panels/${panelId}`, { method: 'GET' });
      return { data };
    } catch (error: any) {
      const Error: ErrorResponse = parseApiError(error);
      return { error: Error };
    }
  };

  return {
    createSolarPanel,
    createSolarPanelsBulk,
    listSolarPanels,
    updateSolarPanel,
    getUserSolarPanels,
    getSolarPanelsByStatus,
    getNearbySolarPanels,
    getClusteredSolarPanels,
    getPanelsInBounds,
    deleteSolarPanel,
    getSolarPanel,
  };
};