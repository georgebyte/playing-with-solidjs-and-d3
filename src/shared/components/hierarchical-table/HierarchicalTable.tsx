import * as d3 from "d3";
import {Component, createEffect} from "solid-js";

import styles from "./HierarchicalTable.module.css";

export type HierarchicalData = {
    label: string;
    children?: HierarchicalData[];
    value?: number;
    collapsed?: boolean;
    valueModifier?: "none" | "inverted" | "skipped";
};

export type HierarchicalTableRow = d3.HierarchyNode<HierarchicalData>;

export type HierarchicalTableColumn = {
    label: string;
    value: (d: HierarchicalTableRow) => string | number;
    actions?: {
        label: string;
        handler: (d: HierarchicalTableRow) => void;
    }[];
};

type HierarchicalTableProps = {
    data: HierarchicalData;
    columns: HierarchicalTableColumn[];
};

export const HierarchicalTable: Component<HierarchicalTableProps> = (props) => {
    let tableContainer: HTMLDivElement | undefined;

    createEffect(() => {
        if (!tableContainer) {
            return;
        }
        const root = d3.hierarchy(props.data);
        renderTable(root, props.columns, tableContainer);
    });

    return <div ref={tableContainer} class={styles.HierarchicalTable} />;
};

function renderTable(
    root: d3.HierarchyNode<HierarchicalData>,
    columns: HierarchicalTableColumn[],
    tableContainer: HTMLDivElement
) {
    const table = d3.select(tableContainer).html("").append("table");
    const thead = table.append("thead");
    thead
        .append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text((d) => d.label);

    const tbody = table.append("tbody");
    renderRows(root, columns, tbody);
}

function renderRows(
    root: d3.HierarchyNode<HierarchicalData>,
    columns: HierarchicalTableColumn[],
    tbody: d3.Selection<HTMLTableSectionElement, unknown, null, undefined>,
    recalculateSums = true
) {
    if (recalculateSums) {
        root.sum((d) => sumValues(d));
    }

    const rows = generateVisibleRows(root);

    const row = tbody
        .selectAll("tr")
        .data(rows)
        .join("tr")
        .classed(styles.CollapsibleRow, (d) => !!d.children)
        .classed(styles.CollapsedRow, (d) => !!d.data.collapsed)
        .on("click", null);

    row.filter((d) => !!d.children).on("click", (_, d) => {
        d.data.collapsed = !d.data.collapsed;
        renderRows(root, columns, tbody, false);
    });

    row.selectAll("td")
        .data((d) => generateRowCells(d, columns))
        .join("td")
        .text((d) => d.text)
        .filter((d) => !!d.actions)
        .append("button")
        .text("...")
        .on("click", (_, d) => {
            if (!d.actions || !d.actions[0]) {
                return;
            }
            d.actions[0].handler(d.row);
            renderRows(root, columns, tbody);
        });
}

function generateVisibleRows(node: d3.HierarchyNode<HierarchicalData>, rows: HierarchicalTableRow[] = []) {
    if (node.parent) {
        // Only add nodes with a parent to exclude root node from the table
        rows.push(node);
    }

    if (node.children && !node.data.collapsed) {
        node.children.forEach((child) => generateVisibleRows(child, rows));
    }

    return rows;
}

function generateRowCells(row: HierarchicalTableRow, columns: HierarchicalTableColumn[]) {
    return columns.map((column) => {
        return {row, text: column.value(row), actions: !row.children && column.actions ? column.actions : null};
    });
}

function sumValues(d: HierarchicalData) {
    const value = d.value || 0;
    switch (d.valueModifier) {
        case "inverted":
            return value * -1;
        case "skipped":
            return 0;
        default:
            return value;
    }
}
