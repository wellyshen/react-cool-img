import React from 'react';
import ReactDOM from 'react-dom';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import copy from 'rollup-plugin-copy';

import pkg from '../package.json';
import template from './template';

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
  !isLib && url(),
  !isLib && postcss({ extract: true, sourceMap: isDev, minimize: !isDev }),
  !isLib && html({ template }),
  !isLib &&
    copy({
      targets: [
        { src: 'src/static/example_assets', dest: 'src/.dev', rename: 'assets' }
      ]
    }),
  isDev && serve('src/.dev'),
  isDev && livereload(),
  !isDev && terser(),
  !isDev && filesize(),
  isExample &&
    copy({
      targets: [{ src: 'src/.dev', dest: '.', rename: 'example' }],
      hook: 'writeBundle'
    }),
  isLib &&
    copy({
      targets: [
        {
          src: 'src/types/react-cool-img.d.ts',
          dest: pkg.types.split('/')[0],
          rename: 'index.d.ts'
        }
      ]
    })
];

export default {
  input: isLib ? 'src/Img' : 'src',
  output: isLib ? [cjs, esm] : [cjs],
  plugins,
  external: isLib ? Object.keys(pkg.peerDependencies) : []
};
