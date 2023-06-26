export {}; // Make this a module so that TS treats this file as a module and not a script

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                babelConfig: {
                    presets: ["babel-preset-solid", "@babel/preset-env"],
                },
                tsconfig: "tsconfig.json",
            },
        ],
        "\\.module\\.css$": "jest-css-modules-transform",
    },
    moduleNameMapper: {
        "solid-js/web": "<rootDir>/node_modules/solid-js/web/dist/web.cjs",
        "solid-js": "<rootDir>/node_modules/solid-js/dist/solid.cjs",
    },
};
