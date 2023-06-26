import {formatNumber} from "./numberHelpers";

describe("numberHelpers", () => {
    describe("formatNumber", () => {
        it("should correctly format numbers", () => {
            expect(formatNumber(0)).toBe("0");

            expect(formatNumber(100)).toBe("100");
            expect(formatNumber(1000)).toBe("1.0K");
            expect(formatNumber(10500)).toBe("10.5K");
            expect(formatNumber(10490)).toBe("10.5K");
            expect(formatNumber(10440000)).toBe("10.4M");
            expect(formatNumber(10440000000)).toBe("10.4B");
            expect(formatNumber(104400000000000)).toBe("104.4T");

            expect(formatNumber(-100)).toBe("-100");
            expect(formatNumber(-1000)).toBe("-1.0K");
            expect(formatNumber(-10500)).toBe("-10.5K");
            expect(formatNumber(-10490)).toBe("-10.5K");
            expect(formatNumber(-10440000)).toBe("-10.4M");
            expect(formatNumber(-10440000000)).toBe("-10.4B");
            expect(formatNumber(-104400000000000)).toBe("-104.4T");
        });

        it("should return an empty string when input number is null or undefined", () => {
            expect(formatNumber(undefined)).toBe("");
            expect(formatNumber(null)).toBe("");
        });
    });
});
