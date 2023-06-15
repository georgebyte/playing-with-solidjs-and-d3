import type {Component} from "solid-js";

import styles from "./QuarterlyReport.module.css";
import {HierarchicalTable} from "../../shared/components/hierarchical-table/HierarchicalTable";
import {useDemoData} from "./useDemoData";

export const QuarterlyReport: Component = () => {
    const demoData = useDemoData();

    return (
        <div class={styles.QuarterlyReport}>
            <HierarchicalTable data={demoData} />
        </div>
    );
};
