import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = require("./package.json");

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main, // e.g., "dist/index.js"
      format: "cjs",
      sourcemap: true,
      exports: "default", // Force default export
    },
    {
      file: packageJson.module, // e.g., "dist/index.esm.js"
      format: "esm",
      sourcemap: true,
      exports: "default",
    },
  ],
  plugins: [
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
      extract: true,
      minimize: true,
    }),
  ],
};
