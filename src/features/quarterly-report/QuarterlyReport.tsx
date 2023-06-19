import {Component, createSignal} from "solid-js";

import styles from "./QuarterlyReport.module.css";
import {
    HierarchicalTable,
    HierarchicalTableRow,
    HierarchicalTableColumn,
} from "../../shared/components/hierarchical-table/HierarchicalTable";
import {useDemoDataByMonth, useDemoDataByWeek} from "./useDemoData";
import {useTransformToHierarchicalData} from "./useTransformToHierarchicalData";

export const QuarterlyReport: Component = () => {
    const demoDataByMonth = useDemoDataByMonth();
    const hierarchicalDataByMonth = useTransformToHierarchicalData(demoDataByMonth);

    const demoDataByWeek = useDemoDataByWeek();
    const hierarchicalDataByWeek = useTransformToHierarchicalData(demoDataByWeek);

    const columns: HierarchicalTableColumn[] = [
        {
            label: "",
            value: (d: HierarchicalTableRow) => {
                return d.data.label;
            },
        },
        {
            label: "AC",
            value: (d: HierarchicalTableRow) => {
                if (d.value === undefined) {
                    return "";
                }
                return d.value;
            },
            actions: [
                {
                    label: "Invert",
                    handler: (d: HierarchicalTableRow) => {
                        d.data.valueModifier = "inverted";
                    },
                },
                {
                    label: "Skip",
                    handler: (d: HierarchicalTableRow) => {
                        d.data.valueModifier = "skipped";
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
