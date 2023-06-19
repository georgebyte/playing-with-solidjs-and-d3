import {Component, createSignal} from "solid-js";

import styles from "./QuarterlyReport.module.css";
import {
    HierarchicalTable,
    HierarchicalTableRow,
    HierarchicalTableColumn,
} from "../../shared/components/hierarchical-table/HierarchicalTable";
import {useDemoDataByMonth, useDemoDataByWeek} from "./useDemoData";
import {useTransformToHierarchicalData} from "./useTransformToHierarchicalData";
import {formatNumber} from "../../shared/helpers/numberHelpers";

export const QuarterlyReport: Component = () => {
    const demoDataByMonth = useDemoDataByMonth();
    const hierarchicalDataByMonth = useTransformToHierarchicalData(demoDataByMonth);

    const demoDataByWeek = useDemoDataByWeek();
    const hierarchicalDataByWeek = useTransformToHierarchicalData(demoDataByWeek);

    const columns: HierarchicalTableColumn[] = [
        {
            label: "",
            getValue: (d: HierarchicalTableRow) => {
                return d.data.label;
            },
        },
        {
            label: "AC",
            getValue: (d: HierarchicalTableRow) => {
                // Don't return the calculated value (e.g. d3 hierarchy sum) if row has an
                // actual value set in the source data
                if (d.data.value !== undefined) {
                    return formatNumber(d.data.value);
                }
                return formatNumber(d.value);
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

    const [dataToDisplay, setDataToDisplay] = createSignal(hierarchicalDataByMonth);

    return (
        <div class={styles.QuarterlyReport}>
            <button onClick={() => setDataToDisplay(hierarchicalDataByMonth)}>Demo data by month</button>
            <button onClick={() => setDataToDisplay(hierarchicalDataByWeek)}>Demo data by week</button>
            <HierarchicalTable data={dataToDisplay()} columns={columns} />
        </div>
    );
};
