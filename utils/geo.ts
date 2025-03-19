export async function fetchCityName(lat: number, lon: number): Promise<string | null> {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        return data.address?.city || data.address?.town || data.address?.village || null;
    } catch (error) {
        console.error("Error fetching city name:", error);
        return null;
    }
}