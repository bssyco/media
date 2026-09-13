import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import banner from "./banner.js";
// import { terser } from 'rollup-plugin-terser';
import { MEDIA_FILE_NAME, MEDIA_NAME } from "../src/js/var.js";
import html from "@rollup/plugin-html";
import url from "@rollup/plugin-url";
import json from "@rollup/plugin-json";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

let fileDest = MEDIA_FILE_NAME;
const external = ["jquery"];

const globals = {
  jquery: "jQuery",
};

module.exports = {
  input: [path.resolve(__dirname, "../src/js/main.js")],
  output: {
    banner,
    file: path.resolve(__dirname, `../dist/js/${fileDest}`),
    format: "umd",
    //format: "esm",
    //format: 'cjs',
    globals,
    name: MEDIA_NAME,
    sourcemap: true,
  },
  external,
  plugins: [
    babel({
      exclude: "node_modules/**", // Only transpile our source code
      presets: ["@babel/preset-env"],
        // , {
        //modules: "false",
        //useBuiltIns: "usage"
        // "corejs": "3.22"
        // targets: {
        //  browsers: '> 1%, IE 11, not op_mini all, not dead',
        //  node: 8
        // },
      // }],
      plugins: ["babel-plugin-transform-html-import-to-string"],
      extensions: [".js", ".html"],
      // externalHelpersWhitelist: [ // Include only required helpers
      //   'defineProperties',
      //   'createClass',
      //   'inheritsLoose',
      //   'defineProperty',
      //   'objectSpread'
      // ]
    }),
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    //production && terser(), // minify, but only in production
    json(),
    html(),
    url(),
  ],
};
