export default function getWeatherGroup(wmoCode: number) {
    if (wmoCode >= 0 && wmoCode <= 19) return 'clear';
    if ((wmoCode >= 20 && wmoCode <= 29) || (wmoCode >= 50 && wmoCode <= 69)) return 'precipitation';
    if (wmoCode >= 40 && wmoCode <= 49) return 'foggy';
    if (wmoCode >= 90 && wmoCode <= 99) return 'stormy';
    if (wmoCode >= 70 && wmoCode <= 79) return 'snowy';
    if (wmoCode >= 30 && wmoCode <= 39) return 'windy';
    return 'clear'; // Default fallback
}