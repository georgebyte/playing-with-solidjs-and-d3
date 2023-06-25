import {Component} from "solid-js";
import {HierarchicalTable} from "../../shared/components/hierarchical-table/HierarchicalTable";
import {useDemoDataByWeek} from "./useDemoData";
import {useTransformToHierarchicalData} from "./useTransformToHierarchicalData";
import {useQuarterlyReportColumns} from "./useQuarterlyReportColumns";

export const QuarterlyReportByWeekView: Component = () => {
    const demoData = useDemoDataByWeek();
    const hierarchicalDemoData = useTransformToHierarchicalData(demoData);
    const columns = useQuarterlyReportColumns();

    return <HierarchicalTable data={hierarchicalDemoData} columns={columns} />;
};
