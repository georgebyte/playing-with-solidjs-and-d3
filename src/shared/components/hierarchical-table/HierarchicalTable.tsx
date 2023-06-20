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

type HierarchicalTableCell = {
    row: HierarchicalTableRow;
    column: HierarchicalTableColumn;
    content: string;
};

type ColumnAction = {
    label: string;
    handler: (d: HierarchicalTableRow) => void;
};

export type HierarchicalTableColumn = {
    label: string;
    getValue: (d: HierarchicalTableRow) => string;
    actions?: ColumnAction[];
};

type HierarchicalTableProps = {
    data: HierarchicalData;
    columns: HierarchicalTableColumn[];
};

let actionsMenuContainer: HTMLDivElement | undefined;

export const HierarchicalTable: Component<HierarchicalTableProps> = (props) => {
    let tableContainer: HTMLDivElement | undefined;

    createEffect(() => {
        if (!tableContainer) {
            return;
        }
        const root = d3.hierarchy(props.data);
        renderTable(root, props.columns, tableContainer);
    });

    return (
        <>
            <div ref={tableContainer} class={styles.HierarchicalTableContainer} />
            <div ref={actionsMenuContainer} class={styles.ActionsMenu} />
        </>
    );
};

function renderTable(
    root: d3.HierarchyNode<HierarchicalData>,
    columns: HierarchicalTableColumn[],
    tableContainer: HTMLDivElement
) {
    const table = d3.select(tableContainer).html("").append("table").classed(styles.HierarchicalTable, true);
    const thead = table.append("thead");
    thead
        .append("tr")
        .classed(styles.HierarchicalTableHeaderRow, true)
        .selectAll("th")
        .data(columns)
        .join("th")
        .classed(styles.HierarchicalTableHeaderCell, true)
        .text((column) => column.label);

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
        .classed(styles.HierarchicalTableRow, true)
        .classed(styles.CollapsibleTableRow, (row) => !!row.children)
        .classed(styles.CollapsedTableRow, (row) => !!row.data.collapsed)
        .attr("data-row-depth", (row) => row.depth)
        .on("click", null);

    row.filter((row) => !!row.children).on("click", (_, row) => {
        row.data.collapsed = !row.data.collapsed;
        renderRows(root, columns, tbody, false);
    });

    const cell = row
        .selectAll("td")
        .data((row) => generateRowCells(row, columns))
        .join("td")
        .classed(styles.HierarchicalTableCell, true)
        .classed(styles.HierarchicalTableCellWithActions, (cell) => !!cell.column.actions)
        .classed(styles.InvertedValue, (cell) => cell.row.data.valueModifier === "inverted")
        .classed(styles.SkippedValue, (cell) => cell.row.data.valueModifier === "skipped")
        .text((cell) => cell.content);

    cell.filter((cell) => !cell.row.children && !!cell.column.actions)
        .append("button")
        .text("•••")
        .classed(styles.ActionsMenuToggle, true)
        .on("click", (event: PointerEvent, cell) => {
            event.stopPropagation();
            hideActionsMenu();
            showActionsMenu(cell, event, () => renderRows(root, columns, tbody));
        });
}

function showActionsMenu(cell: HierarchicalTableCell, event: PointerEvent, rerender: () => void) {
    // PRTODO (jb): Actions container is barely visible even when hidden because of border
    if (!actionsMenuContainer || !cell.column.actions) {
        return;
    }

    const triggerPosition = (event.target as HTMLElement).getBoundingClientRect();

    d3.select(actionsMenuContainer)
        .style("top", `${triggerPosition.top + triggerPosition.height}px`)
        .style("left", `${triggerPosition.left}px`)
        .selectAll("button")
        .data(cell.column.actions)
        .join("button")
        .text((action) => action.label)
        .on("click", (event: PointerEvent, action) => {
            event.stopPropagation();
            action.handler(cell.row);
            hideActionsMenu();
            rerender();
        });

    d3.select("body").on("click", hideActionsMenu);
}

function hideActionsMenu() {
    if (!actionsMenuContainer) {
        return;
    }

    const actionsMenu = d3.select(actionsMenuContainer);
    actionsMenu.selectAll("button").on("click", null);
    actionsMenu.html("");

    d3.select("body").on("click", null);
}

function generateVisibleRows(node: d3.HierarchyNode<HierarchicalData>, rows: HierarchicalTableRow[] = []) {
    if (node.parent) {
        // Only add nodes with a parent to exclude root node from the table
        rows.push(node);
    }
    // PRTODO (jb): Mark row as last child to skip applying the border-bottom style

    if (node.children && !node.data.collapsed) {
        node.children.forEach((child) => generateVisibleRows(child, rows));
    }

    return rows;
}

function generateRowCells(row: HierarchicalTableRow, columns: HierarchicalTableColumn[]): HierarchicalTableCell[] {
    return columns.map((column) => {
        return {row, column, content: column.getValue(row)};
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
