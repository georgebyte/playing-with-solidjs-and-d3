export function formatNumber(number: number | undefined | null) {
    if (number === undefined || number === null) {
        return "";
    }
    const absNumber = Math.abs(number);
    const sign = number < 0 ? "-" : "";
    if (absNumber >= 1000) {
        const suffixes = ["", "K", "M", "B", "T"];
        const suffixIndex = Math.floor(Math.log10(absNumber) / 3);
        const abbreviatedNumber = (absNumber / Math.pow(1000, suffixIndex)).toFixed(1);
        return sign + abbreviatedNumber + suffixes[suffixIndex];
    }
    return number.toString();
}
