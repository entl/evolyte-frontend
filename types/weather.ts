export interface WeatherRequest {
    latitude: number;
    longitude: number;
    azimuth: number | null;
    tilt: number | null;
    start_date: string | Date;
    end_date: string | Date;
}

export interface HourlyWeatherData {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    dew_point_2m: number;
    pressure_msl: number;
    surface_pressure: number;
    precipitation: number;
    cloud_cover: number;
    et0_fao_evapotranspiration: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    shortwave_radiation: number;
    diffuse_radiation: number;
    direct_radiation: number;
    direct_normal_irradiance: number;
    terrestrial_radiation: number;
    is_day: number;
    sunshine_duration: number;
    weather_code: number;
}

export interface WeatherResponse {
    latitude: number;
    longitude: number;
    start_date: string;
    end_date: string;
    hourly: HourlyWeatherData[];
}

export interface WeatherCondition {
    description: string;
    image: string;
}

export const WeatherGroupBackgrounds: Record<string, string> = {
    clear: '/images/weather/sunny.jpg',
    precipitation: '/images/weather/rainy.jpg',
    foggy: '/images/weather/foggy.jpg',
    stormy: '/images/weather/stormy.jpg',
    snowy: '/images/weather/snowy.jpg',
    windy: '/images/weather/windy.jpg',
} as const;