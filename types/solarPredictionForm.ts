export default interface SolarPredictionForm {
    lat: number;
    lon: number;
    kwp: number;
    loss: number;
    tilt: number;
    azimuth: number;
    kwhPrice: number;
    dateRange: {
        start: string | Date
        end: string | Date;
    };
}