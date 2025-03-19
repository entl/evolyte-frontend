import {ref} from 'vue'
import {toast} from '~/components/ui/toast'
import type {WeatherRequest, WeatherResponse} from '~/types/weather'

const API_URL = "http://localhost:8001/api/v1/weather"

export function useWeather() {
    const weatherData = ref<WeatherResponse | null>(null);
    const isLoading = ref(false);
    const fetchWeather = async (params: WeatherRequest) => {
        try {
            const queryParams = new URLSearchParams({
                latitude: params.latitude.toFixed(5),
                longitude: params.longitude.toFixed(5),
                start_date: params.start_date.toString(),
                end_date: params.end_date.toString(),
            });

            const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
                method: "GET",
                headers: { "Accept": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            weatherData.value = await response.json();
        } catch (error) {
            let errorMessage = "Failed to fetch weather data.";

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (error.response) {
                try {
                    const errorData = await error.response.json();
                    console.log('errorData', errorData)
                    errorMessage = `${errorData.error_code}: ${errorData.message}`;
                } catch (jsonError) {
                    errorMessage = "Unexpected error response format.";

                }
            }
            toast({ title: 'Error', description: errorMessage, variant: 'destructive' })
        }
    }

    return { weatherData, fetchWeather }
}
