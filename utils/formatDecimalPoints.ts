// format decimal points
export function formatDecimalPoints(value: number, decimalPoints: number): number {
    return Number(value.toFixed(decimalPoints));
}