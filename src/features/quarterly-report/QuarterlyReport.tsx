import {Component, createSignal} from "solid-js";

import styles from "./QuarterlyReport.module.css";
import {HierarchicalTable} from "../../shared/components/hierarchical-table/HierarchicalTable";
import {useDemoDataByMonth, useDemoDataByWeek} from "./useDemoData";
import {useTransformToHierarchicalData} from "./useTransformToHierarchicalData";

export const QuarterlyReport: Component = () => {
    const demoDataByMonth = useDemoDataByMonth();
    const hierarchicalDataByMonth = useTransformToHierarchicalData(demoDataByMonth);

    const demoDataByWeek = useDemoDataByWeek();
    const hierarchicalDataByWeek = useTransformToHierarchicalData(demoDataByWeek);

    const [dataToDisplay, setDataToDisplay] = createSignal(hierarchicalDataByWeek);

    return (
        <div class={styles.QuarterlyReport}>
            <HierarchicalTable data={dataToDisplay()} />
        </div>
    );
};
