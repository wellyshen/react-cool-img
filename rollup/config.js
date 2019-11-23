import React from 'react';
import ReactDOM from 'react-dom';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import url from 'rollup-plugin-url';
import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-bundle-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

import pkg from '../package.json';

const { BUILD } = process.env;
const isDev = BUILD === 'dev';
const isExample = BUILD === 'example';
const isLib = BUILD === 'lib';

const cjs = {
  file: isLib ? pkg.main : 'src/.dev/bundle.js',
  format: 'cjs',
  sourcemap: isDev
};

const esm = {
  file: pkg.module,
  format: 'esm'
};

const extensions = ['.js', '.ts', '.tsx', '.json'];
const plugins = [
  resolve({ extensions }),
  commonjs({
    namedExports: {
      react: Object.keys(React),
      'react-dom': Object.keys(ReactDOM)
    }
  }),
  babel({ exclude: 'node_modules/**', extensions }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
  }),
  !isLib && url({ limit: 10 * 1024 }),
  !isLib && postcss({ extract: true, sourceMap: isDev, minimize: !isDev }),
  !isLib &&
    html({
      template: 'rollup/template.html',
      dest: 'src/.dev',
      filename: 'index.html'
    }),
  isDev && serve('src/.dev'),
  isDev && livereload(),
  // Must be placed before terser
  !isDev && sizeSnapshot(),
  !isDev && terser(),
  isExample &&
    copy({
      targets: [{ src: 'src/.dev', dest: '.', rename: 'example' }],
      hook: 'writeBundle'
    })
];

export default {
  input: isLib ? 'src/Img' : 'src',
  output: isLib ? [cjs, esm] : [cjs],
  plugins,
  external: isLib ? Object.keys(pkg.peerDependencies) : []
};
