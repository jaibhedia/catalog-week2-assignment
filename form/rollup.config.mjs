import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import path from "path";

const packageJson = require("./package.json");

export default {
  input: "src/index.tsx", // Your main entry point that exports your component
  output: [
    {
      file: packageJson.main, // e.g., "dist/index.js"
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module, // e.g., "dist/index.esm.js" (optional)
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    // Automatically externalize peerDependencies (e.g., react, react-dom)
    peerDepsExternal(),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    postcss({
      extract: true, // Extract CSS to a separate file
      minimize: true,
    }),
  ],
};
