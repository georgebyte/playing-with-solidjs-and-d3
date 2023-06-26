import {DemoDataItem} from "./useDemoData";
import {HierarchicalData} from "../../shared/components/hierarchical-table/HierarchicalTable";

export function useTransformToHierarchicalData(input: DemoDataItem[]): HierarchicalData {
    return {label: "root", children: input.map((item) => transformItem(item))};
}

function transformItem(item: DemoDataItem): HierarchicalData {
    let node: HierarchicalData = {label: ""};
    for (const [key, value] of Object.entries(item)) {
        if (Array.isArray(value)) {
            node = {
                label: key,
                children: value.map((item) => {
                    return transformItem(item);
                }),
            };
        } else {
            node = {
                label: key,
                value,
            };
        }
    }
    return node;
}
