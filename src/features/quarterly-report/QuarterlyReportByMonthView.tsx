import {Component} from "solid-js";
import {HierarchicalTable} from "../../shared/components/hierarchical-table/HierarchicalTable";
import {useDemoDataByMonth} from "./useDemoData";
import {useTransformToHierarchicalData} from "./useTransformToHierarchicalData";
import {useQuarterlyReportColumns} from "./useQuarterlyReportColumns";

export const QuarterlyReportByMonthView: Component = () => {
    const demoData = useDemoDataByMonth();
    const hierarchicalDemoData = useTransformToHierarchicalData(demoData);
    const columns = useQuarterlyReportColumns();

    return <HierarchicalTable data={hierarchicalDemoData} columns={columns} />;
};
