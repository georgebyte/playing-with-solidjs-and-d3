import type {Component} from "solid-js";

import styles from "./App.module.css";
import {QuarterlyReport} from "./features/quarterly-report/QuarterlyReport";

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
                <div class={styles.HeaderText}>hippo bi</div>
                <div class={styles.HeaderThemeToggle}>
                    <button onClick={toggleTheme}>Toggle theme</button>
                </div>
            </header>
            <main class={styles.Main}>
                <QuarterlyReport />
            </main>
        </div>
    );
};
