export default interface AggregatedSolarData {
    expectedEnergy: {
        actual: number;   // Predicted energy production in kWh
        maxTheoretical: number; // Theoretical maximum possible in kWh
    };
    peakSolarHours: {
        actual: number;   // Measured or predicted peak sunlight duration in hours
        maxTheoretical: number; // Theoretical max based on location and season
    };
    averageIrradiance: {
        actual: number;   // Average irradiance in W/m²
        maxTheoretical: number; // Maximum possible under ideal conditions
    };
    cloudCoverPercentage: {
        actual: number;   // Measured cloud cover in %
        maxTheoretical: number; // Typically 100% (fully overcast sky)
    };
}