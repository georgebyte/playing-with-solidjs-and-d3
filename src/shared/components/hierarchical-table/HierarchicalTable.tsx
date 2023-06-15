import type {Component} from "solid-js";

import styles from "./HierarchicalTable.module.css";

type HierarchicalTableDataItem = {
    [key: string]: HierarchicalTableDataItem[] | number;
};

type HierarchicalTableProps = {
    data: HierarchicalTableDataItem[];
};

export const HierarchicalTable: Component<HierarchicalTableProps> = (props) => {
    return <div class={styles.HierarchicalTable}>{JSON.stringify(props.data)}</div>;
};
