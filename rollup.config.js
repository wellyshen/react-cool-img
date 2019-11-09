import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import pkg from './package.json';

const { BUILD } = process.env;
const isDev = BUILD === 'dev';
const isDist = BUILD === 'dist';

const cjs = {
  file: isDist ? pkg.main : 'example/assets/bundle.js',
  format: 'cjs',
  sourcemap: true
};

const esm = {
  file: pkg.module,
  format: 'esm',
  sourcemap: true
};

const extensions = ['.js', '.ts', '.tsx', '.json'];
const common = [
  babel({ exclude: 'node_modules/**', extensions }),
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
  })
];
const plugins = isDev
  ? [
      ...common,
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      serve('example'),
      livereload()
    ]
  : [
      ...common,
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      // eslint-disable-next-line @typescript-eslint/camelcase
      terser({ sourcemap: true, compress: { drop_console: true } })
    ];

export default {
  input: isDist ? 'src/Img.tsx' : 'src/index.tsx',
  output: isDist ? [cjs, esm] : [cjs],
  plugins,
  external: isDist ? Object.keys(pkg.peerDependencies) : []
};
