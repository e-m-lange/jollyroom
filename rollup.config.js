import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: {
        animations: "./src/animations.js",
        index: "./src/index.js",
    },
    output: {
        dir: "public",       // output directory for multiple bundles
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].bundle.js", // e.g. animations.bundle.js, index.bundle.js
    },
    plugins: [resolve(), commonjs()],
};