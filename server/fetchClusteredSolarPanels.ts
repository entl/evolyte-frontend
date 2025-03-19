import {ClusteredSolarPanelsResponse} from "~/types/solarPanels";


export async function fetchClusteredSolarPanels(
   min_lat: number, max_lat: number, min_lon: number, max_lon: number, zoom_level: number
): Promise<ClusteredSolarPanelsResponse> {
    let url = useRuntimeConfig().public.apiBase + '/solar-panels/clustered';
    const queryString = new URLSearchParams(
        {
            min_lat: min_lat.toString(),
            max_lat: max_lat.toString(),
            min_lon: min_lon.toString(),
            max_lon: max_lon.toString(),
            zoom_level: zoom_level.toString(),
        }
    ).toString();
    url = `${url}?${queryString}`;

    try {
        return await $fetch(url, {method: 'GET'});
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
}