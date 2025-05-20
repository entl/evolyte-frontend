export enum PanelStatusEnum {
    OPERATIONAL = "OPERATIONAL",
    MAINTENANCE = "MAINTENANCE",
    OFFLINE = "OFFLINE",
    UNKNOWN = "UNKNOWN",
}

export interface SolarPanelBase {
    serial_number: string;
    name: string;
    manufacturer?: string;
    model?: string;
    installation_date?: string;

    capacity_kw: number;
    efficiency?: number;
    voltage_rating?: number;
    current_rating?: number;
    width?: number;
    length?: number;
    height?: number;
    weight?: number;
    orientation?: number;
    tilt?: number;

    status?: PanelStatusEnum;

    location: [number, number]; // [Latitude, Longitude]
}

export interface SolarPanelCreate extends SolarPanelBase {
    user_id?: number; // user id is optional for solar panels from open data sources
}

export interface SolarPanelUpdate extends Partial<SolarPanelBase> {}

export interface SolarPanelResponse extends SolarPanelBase {
    id: number;
    user_id?: number;
    created_at: string;
    updated_at: string;
}

export interface SolarPanelsCluster {
    latitude: number;
    longitude: number;
    count: number;
    min_latitude: number;
    max_latitude: number;
    min_longitude: number;
    max_longitude: number;
}

export interface ClusteredSolarPanelsResponse {
    clusters: SolarPanelsCluster[];
}