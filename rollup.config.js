import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import url from 'rollup-plugin-url';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const { BUILD } = process.env;
const isDev = BUILD === 'dev';
const isExample = BUILD === 'example';
const isDist = BUILD === 'dist';

const cjs = {
  file: isDist ? pkg.main : 'example/assets/bundle.js',
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
      react: [
        'createContext',
        'forwardRef',
        'createElement',
        'Component',
        'Fragment'
      ]
    }
  }),
  babel({ exclude: 'node_modules/**', extensions }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
  }),
  !isDist && url({ publicPath: '/assets/', limit: 10 * 1024 }),
  !isDist && postcss({ extract: true, sourceMap: isDev, minimize: !isDev }),
  isDev && serve('example'),
  isDev && livereload(),
  // Must be placed before terser
  !isDev && sizeSnapshot(),
  // eslint-disable-next-line @typescript-eslint/camelcase
  !isDev && terser({ sourcemap: true, compress: { drop_console: true } })
];

export default {
  input: isDist ? 'src/Img' : 'src',
  output: isDist ? [cjs, esm] : [cjs],
  plugins,
  external: isDist ? Object.keys(pkg.peerDependencies) : []
};
