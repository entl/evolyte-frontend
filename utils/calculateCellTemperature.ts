export function calculateCellTemperature(T_amb: number, NOCT: number, G: number): number {
    return T_amb + ((NOCT - 20) / 800) * G;
}