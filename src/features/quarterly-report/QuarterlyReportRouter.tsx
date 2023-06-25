import type {Component} from "solid-js";
import {Routes, Route} from "@solidjs/router";
import {QuarterlyReportByMonthView} from "./QuarterlyReportByMonthView";
import {QuarterlyReportByWeekView} from "./QuarterlyReportByWeekView";

export const QuarterlyReportRouter: Component = () => {
    return (
        <Routes>
            <Route path="/by-month" component={QuarterlyReportByMonthView} />
            <Route path="/by-week" component={QuarterlyReportByWeekView} />
        </Routes>
    );
};
