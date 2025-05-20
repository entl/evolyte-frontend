import type { WeatherResponse } from "~/types/api/weather";
import type AggregatedSolarData from "~/types/aggregatedSolarData";
import type {PredictionResponse, TimeSeriesPredictionResponse} from "~/types/api/prediction";

export default function calculateAggregatedSolarData(
    weatherData: WeatherResponse,
    solarForecast: PredictionResponse[],
    kwp: number
): AggregatedSolarData {
    if (!weatherData?.hourly?.length) {
        throw new Error("Invalid weather data provided.");
    }

    if (!solarForecast?.length) {
        throw new Error("Invalid solar forecast data provided.");
    }
    const daylightHours = weatherData.hourly.filter(hour => hour.is_day === 1);

    // Aggregate relevant weather data
    const totalIrradiance = weatherData.hourly.reduce((sum, hour) => sum + hour.shortwave_radiation, 0);
    const peakSolarHours = weatherData.hourly.filter(hour => hour.shortwave_radiation > 200).length; // Threshold: 200 W/m²
    const averageIrradiance = daylightHours.length > 0 ? totalIrradiance / daylightHours.length : 0;
    const averageCloudCover = daylightHours.length > 0
        ? daylightHours.reduce((sum, hour) => sum + hour.cloud_cover, 0) / daylightHours.length
        : 0;

    const expectedEnergy = solarForecast.reduce((sum, prediction) => sum + prediction.prediction, 0);

    // theoretical maximum energy output
    const theoreticalMaxEnergy = calculateTheoreticalMaxEnergy(kwp, peakSolarHours, 0.22);

    const aggregatedData: AggregatedSolarData = {
        expectedEnergy: {
            actual: expectedEnergy,
            maxTheoretical: theoreticalMaxEnergy
        },
        peakSolarHours: {
            actual: peakSolarHours,
            maxTheoretical: solarForecast.length
        },
        averageIrradiance: {
            actual: averageIrradiance,
            maxTheoretical: 1000 // Typical max irradiance in W/m²
        },
        cloudCoverPercentage: {
            actual: averageCloudCover,
            maxTheoretical: 100 // Typically 100% (fully overcast sky)
        }
    };
    return aggregatedData;
}

/**
 * Calculates the theoretical maximum energy output of a solar panel.
 */
function calculateTheoreticalMaxEnergy(
    panelCapacity: number, // kWp
    peakSolarHours: number, // hours
    panelEfficiency: number = 0.20 // Default to 20% efficiency
): number {
    return panelCapacity * peakSolarHours * panelEfficiency;
}