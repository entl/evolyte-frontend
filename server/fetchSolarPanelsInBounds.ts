import {SolarPanelResponse} from "~/types/solarPanels";


export async function fetchSolarPanelsInBounds(
    min_lat: number, max_lat: number, min_lon: number, max_lon: number): Promise<SolarPanelResponse[]> {
    let url = useRuntimeConfig().public.apiBase + '/solar-panels/bounds';
    const queryString = new URLSearchParams(
        {
            min_lat: min_lat.toString(),
            max_lat: max_lat.toString(),
            min_lon: min_lon.toString(),
            max_lon: max_lon.toString(),
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