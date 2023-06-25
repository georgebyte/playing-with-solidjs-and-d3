import type {Component} from "solid-js";
import {Route, Routes, A} from "@solidjs/router";

import styles from "./App.module.css";
import {HomeView} from "./features/home/HomeView";
import {QuarterlyReportRouter} from "./features/quarterly-report/QuarterlyReportRouter";

export const App: Component = () => {
    function toggleTheme() {
        const body = document.querySelector("body");
        if (!body) {
            return;
        }
        body.classList.toggle("dark");
    }

    return (
        <div class={styles.App}>
            <header class={styles.Header}>
                <div class={styles.AppName}>
                    <A href="/">hippo bi</A>
                </div>
                <div class={styles.HeaderLinks}>
                    <A href="/reports/by-month" class={styles.HeaderLink} activeClass={styles.ActiveHeaderLink}>
                        Report by month
                    </A>
                    <A href="/reports/by-week" class={styles.HeaderLink} activeClass={styles.ActiveHeaderLink}>
                        Report by week
                    </A>
                </div>
                <div class={styles.HeaderThemeToggle}>
                    <button onClick={toggleTheme}>Toggle theme</button>
                </div>
            </header>
            <main class={styles.Main}>
                <Routes>
                    <Route path="/" component={HomeView} />
                    <Route path="/reports/*" component={QuarterlyReportRouter} />
                </Routes>
            </main>
        </div>
    );
};
