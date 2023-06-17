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

type HierarchicalTableProps = {
    data: HierarchicalData;
};

const columns = [
    {
        label: "",
        value: (d: d3.HierarchyNode<HierarchicalData>) => {
            return d.data.label;
        },
    },
    {
        label: "AC",
        value: (d: d3.HierarchyNode<HierarchicalData>) => {
            if (d.value === undefined) {
                return "";
            }
            return d.value;
        },
        actions: [
            {
                label: "Invert",
                handler: (d: d3.HierarchyNode<HierarchicalData>) => {
                    d.data.valueModifier = "inverted";
                },
            },
        ],
    },
];

export const HierarchicalTable: Component<HierarchicalTableProps> = (props) => {
    let tableContainer: HTMLDivElement | undefined;

    createEffect(() => {
        if (!tableContainer) {
            return;
        }
        const root = d3.hierarchy(props.data);
        renderTable(tableContainer, root);
    });

    return <div ref={tableContainer} class={styles.HierarchicalTable} />;
};

function generateVisibleRows(
    node: d3.HierarchyNode<HierarchicalData>,
    rows: d3.HierarchyNode<HierarchicalData>[] = []
) {
    if (node.parent) {
        // Skip the root node
        rows.push(node);
    }

    if (node.children && !node.data.collapsed) {
        node.children.forEach((child) => generateVisibleRows(child, rows));
    }

    return rows;
}

function renderTable(tableContainer: HTMLDivElement, root: d3.HierarchyNode<HierarchicalData>) {
    console.log("renderTable", root);

    // PRTODO (jb): Extract into a function
    root.sum((d) => {
        const value = d.value || 0;
        switch (d.valueModifier) {
            case "inverted":
                return value * -1;
            case "skipped":
                return 0;
            default:
                return value;
        }
    });

    const rows = generateVisibleRows(root);

    const table = d3.select(tableContainer).html("").append("table");
    table
        .append("thead")
        .append("tr")
        .selectAll("th")
        .data(columns)
        .join("th")
        .text((d) => d.label);

    const row = table.append("tbody").selectAll("tr").data(rows).join("tr");

    row.filter((d) => !!d.children)
        .classed(styles.CollapsibleRow, true)
        .classed(styles.CollapsedRow, (d) => d.data.collapsed || false)
        .on("click", (_, d) => {
            d.data.collapsed = !d.data.collapsed;
            renderTable(tableContainer, root);
        });

    for (const {value, actions} of columns) {
        row.append("td")
            .text((d) => value(d))
            .filter((d) => !d.children && !!actions)
            .append("button")
            .text("...")
            .on("click", (_, d) => {
                if (!actions || !actions[0]) {
                    return;
                }
                actions[0].handler(d);
                renderTable(tableContainer, root);
            });
    }
}
