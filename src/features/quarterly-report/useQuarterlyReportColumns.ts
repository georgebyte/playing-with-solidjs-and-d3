import {
    HierarchicalTableRow,
    HierarchicalTableColumn,
} from "../../shared/components/hierarchical-table/HierarchicalTable";
import {formatNumber} from "../../shared/helpers/numberHelpers";

export function useQuarterlyReportColumns(): HierarchicalTableColumn[] {
    return [
        {
            label: "",
            getValue: (d: HierarchicalTableRow) => {
                return d.data.label;
            },
        },
        {
            label: "AC",
            getValue: (row: HierarchicalTableRow) => {
                // Don't return the calculated value (e.g. d3 hierarchy sum) for "leaf rows" with an
                // actual value set in the source data
                if (!row.data.children) {
                    const sign = row.data.valueModifier === "inverted" ? "-" : "";
                    return sign + formatNumber(row.data.value);
                }
                return formatNumber(row.value);
            },
            actions: [
                {
                    label: "Include",
                    handler: (row: HierarchicalTableRow) => {
                        row.data.valueModifier = "none";
                    },
                },
                {
                    label: "Invert",
                    handler: (row: HierarchicalTableRow) => {
                        row.data.valueModifier = "inverted";
                    },
                },
                {
                    label: "Skip",
                    handler: (row: HierarchicalTableRow) => {
                        row.data.valueModifier = "skipped";
                    },
                },
            ],
        },
    ];
}
