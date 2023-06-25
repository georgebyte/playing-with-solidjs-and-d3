import type {Component} from "solid-js";

export const HomeView: Component = () => {
    return (
        <>
            <p>
                <strong>hippo bi</strong> application is designed with a modular architecture that highlights the
                seamless integration of independent feature modules reusing common functionality and components from a
                shared module. This architecture promotes code organization, maintainability, and scalability by
                allowing the development of self-contained features that can be easily added, removed or updated without
                affecting other parts of the application. This kind of modular architecture is easily adapted to further
                improve app's performance and scalability by adding lazy loading and/or splitting the app into micro
                frontends using module federation.
            </p>
            <p>
                Main feature module in the application is the reporting module. Users can access reports through the
                "Report by month" and "Report by week" pages. Both of these pages utilize a reusable component called
                HierarchicalTable, which is capable of displaying hierarchical data of any depth. HierarchicalTable
                supports dynamic column definitions and can render as many columns with different context actions as
                needed. Rendering of the reports is handled by the D3 library as instructed in the assignment.
            </p>
        </>
    );
};
