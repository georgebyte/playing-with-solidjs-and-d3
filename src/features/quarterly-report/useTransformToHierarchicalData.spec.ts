import {useTransformToHierarchicalData} from "./useTransformToHierarchicalData";
import {DemoDataItem} from "./useDemoData";

describe("useTransformToHierarchicalData", () => {
    it("should correctly transform input data into hierarchical data", () => {
        const input: DemoDataItem[] = [
            {
                Q3: [
                    {
                        Jul: [{W28: 75300}, {W29: 48200}, {W30: 134900}, {W31: 88600}, {W32: 70400}],
                    },
                    {
                        Aug: 24300,
                    },
                    {
                        Sep: 42700,
                    },
                ],
            },
            {
                Q4: [
                    {
                        Oct: 115500,
                    },
                    {
                        Nov: [{W45: 83900}, {W46: 134700}, {W47: 115800}, {W48: 91600}],
                    },
                    {
                        Dec: 97200,
                    },
                ],
            },
        ];
        expect(useTransformToHierarchicalData(input)).toEqual({
            label: "root",
            children: [
                {
                    label: "Q3",
                    children: [
                        {
                            label: "Jul",
                            children: [
                                {label: "W28", value: 75300},
                                {label: "W29", value: 48200},
                                {label: "W30", value: 134900},
                                {label: "W31", value: 88600},
                                {label: "W32", value: 70400},
                            ],
                        },
                        {label: "Aug", value: 24300},
                        {label: "Sep", value: 42700},
                    ],
                },
                {
                    label: "Q4",
                    children: [
                        {label: "Oct", value: 115500},
                        {
                            label: "Nov",
                            children: [
                                {label: "W45", value: 83900},
                                {label: "W46", value: 134700},
                                {label: "W47", value: 115800},
                                {label: "W48", value: 91600},
                            ],
                        },
                        {label: "Dec", value: 97200},
                    ],
                },
            ],
        });
    });
});
