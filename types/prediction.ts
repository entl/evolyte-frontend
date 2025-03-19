export interface PredictionResponse {
    datetime: Date | string;
    prediction: number;
    co2_saved: number | null;
    money_saved: number | null;
}

export interface PredictionRequest {
    datetime: Date | string;
    kwp: number;
    latitude: number;
    longitude: number;
    tilt: number | null;
    azimuth: number | null;
    kwh_price: number | null;
}

export interface BatchPredictionRequest {
    entries: PredictionRequest[];
}

export interface BatchPredictionResponse {
    predictions: PredictionResponse[];
}

export interface TimeSeriesPredictionRequest {
    start: Date | string;
    end: Date | string;
    kwp: number;
    latitude: number;
    longitude: number;
    tilt: number | null;
    azimuth: number | null;
    kwh_price: number | null;
}

export interface TimeSeriesPredictionResponse {
    predictions: PredictionResponse[];
}