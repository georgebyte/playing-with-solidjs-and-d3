export function formatNumber(number: number | undefined | null) {
    if (number === undefined || number === null) {
        return "";
    }
    if (number >= 1000) {
        const suffixes = ["", "K", "M", "B", "T"];
        const suffixIndex = Math.floor(Math.log10(number) / 3);
        const abbreviatedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1);
        return abbreviatedNumber + suffixes[suffixIndex];
    }
    return number.toString();
}
