type DemoDataItem = {
    [key: string]: DemoDataItem[] | number;
};

export function useDemoData(): DemoDataItem[] {
    return [
        {
            Q1: [
                {
                    Jan: [{W1: 91.5}, {W2: 142.1}, {W3: 78.4}, {W4: 57.9}, {W5: 137.3}],
                },
                {
                    Feb: [{W6: 44.2}, {W7: 195.6}, {W8: 76.3}, {W9: 157.2}],
                },
                {
                    Mar: [{W10: 112.7}, {W11: 88.4}, {W12: 186.1}, {W13: 110.9}],
                },
            ],
        },
        {
            Q2: [
                {
                    Apr: [{W14: 38.2}, {W15: 66.8}, {W16: 174.3}, {W17: 93.1}, {W18: 179.7}],
                },
                {
                    May: [{W19: 52.6}, {W20: 66.9}, {W21: 135.4}, {W22: 120.8}, {W23: 86.7}],
                },
                {
                    Jun: [{W24: 49.5}, {W25: 115.6}, {W26: 61.9}, {W27: 143.7}],
                },
            ],
        },
        {
            Q3: [
                {
                    Jul: [{W28: 75.3}, {W29: 48.2}, {W30: 134.9}, {W31: 88.6}, {W32: 70.4}],
                },
                {
                    Aug: [{W33: 121.2}, {W34: 58.7}, {W35: 97.4}, {W36: 51.9}],
                },
                {
                    Sep: [{W37: 111.3}, {W38: 69.8}, {W39: 89.6}, {W40: 122.1}],
                },
            ],
        },
        {
            Q4: [
                {
                    Oct: [{W41: 42.5}, {W42: 105.7}, {W43: 71.2}, {W44: 160.4}],
                },
                {
                    Nov: [{W45: 83.9}, {W46: 134.7}, {W47: 115.8}, {W48: 91.6}],
                },
                {
                    Dec: [{W49: 47.3}, {W50: 75.1}, {W51: 58.4}, {W52: 159.2}],
                },
            ],
        },
    ];
}