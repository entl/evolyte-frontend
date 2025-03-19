import { ref } from 'vue';
import { toast } from "~/components/ui/toast";
import type SolarPredictionForm from "~/types/solarPredictionForm";

export function useSolarForecast() {
    const solarForecast = ref([]);
    const isLoading = ref(false);

    const fetchSolarForecast = async (form: SolarPredictionForm) => {
        try {
            if (!form.lat || !form.lon || !form.kwp || !form.tilt || !form.azimuth || !form.dateRange.start || !form.dateRange.end) {
                toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' });
                return;
            }

            const API_URL = "http://127.0.0.1:8001/api/v1/predict/time-series"; // Example API URL
            isLoading.value = true;

            const payload = {
                latitude: form.lat.toString(),
                longitude: form.lon.toString(),
                kwp: form.kwp.toString(),
                tilt: form.tilt.toString(),
                azimuth: form.azimuth.toString(),
                kwh_price: form.kwhPrice.toString(),
                start: form.dateRange.start.toString(),
                end: form.dateRange.end.toString(),
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `API Error: ${response.statusText}`);
            }

            solarForecast.value = data.predictions || [];

            toast({ title: 'Success', description: 'Forecast generated successfully!', variant: 'default' });
        } catch (error) {
            let errorMessage = "Failed to fetch solar forecast.";

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (error.response) {
                try {
                    const errorData = await error.response.json();
                    errorMessage = `${errorData.error_code}: ${errorData.message}`;
                } catch (jsonError) {
                    errorMessage = "Unexpected error response format.";
                }
            }

            toast({ title: 'Error', description: errorMessage, variant: 'destructive' });
            console.error("Fetch Error:", error);
        } finally {
            isLoading.value = false;
        }
    };

    return { solarForecast, fetchSolarForecast, isLoading };
}