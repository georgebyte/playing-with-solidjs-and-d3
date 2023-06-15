import type {Component} from "solid-js";

import styles from "./App.module.css";
import {QuarterlyReport} from "./features/quarterly-report/QuarterlyReport";

export const App: Component = () => {
    return (
        <div class={styles.App}>
            <header class={styles.header}>hippo bi</header>
            <main class={styles.main}>
                <QuarterlyReport />
            </main>
        </div>
    );
};
