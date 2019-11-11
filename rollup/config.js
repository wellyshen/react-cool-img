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
const isDist = BUILD === 'dist';

const cjs = {
  file: isDist ? pkg.main : 'src/.dev/bundle.js',
  format: 'cjs',
  sourcemap: !isExample
};

const esm = {
  file: pkg.module,
  format: 'esm',
  sourcemap: true
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
  !isDist && url({ limit: 10 * 1024 }),
  !isDist && postcss({ extract: true, sourceMap: isDev, minimize: !isDev }),
  !isDist &&
    html({
      template: 'rollup/template.html',
      dest: 'src/.dev',
      filename: 'index.html'
    }),
  isDev && serve('src/.dev'),
  isDev && livereload(),
  // Must be placed before terser
  !isDev && sizeSnapshot(),
  // eslint-disable-next-line @typescript-eslint/camelcase
  !isDev && terser({ sourcemap: true, compress: { drop_console: true } }),
  isExample &&
    copy({
      targets: [{ src: 'src/.dev', dest: '.', rename: 'example' }],
      hook: 'writeBundle'
    })
];

export default {
  input: isDist ? 'src/Img' : 'src',
  output: isDist ? [cjs, esm] : [cjs],
  plugins,
  external: isDist ? Object.keys(pkg.peerDependencies) : []
};
