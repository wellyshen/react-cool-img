# React Cool Img

React Cool Img is a lightweight React <Img /> component, which helps you handle image UX (user experience) and performance optimization as a professonal guy 🤓

It enhance the HTML [<img />](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag by many cool [features](#features) without breaking your original development experience. Ideally, it can be an <img /> tag replacement for [React.js](https://reactjs.org).

See the demo: https://keen-goldwasser-415880.netlify.com

[![build status](https://img.shields.io/travis/wellyshen/react-cool-img/master?style=flat-square)](https://travis-ci.org/wellyshen/react-cool-img)
[![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-img?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-img?branch=master)
[![npm version](https://img.shields.io/npm/v/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![MIT licensed](https://img.shields.io/github/license/wellyshen/react-cool-img?style=flat-square)](https://raw.githubusercontent.com/wellyshen/react-cool-img/master/LICENSE)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-img)](https://twitter.com/intent/tweet?text=With%20@React-Cool-Img,%20my%20web%20app%20becomes%20more%20powerful.%20Thanks,%20@Welly%20Shen%20🤩)

## Features

- 🖼 Placeholders for satisfying various image loading states (e.g. loading image > acutal image > error image).
- 🛋 Lazy image loading with modern, performant implementation, using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
- ⏳ An image can wait to be downloaded when it's in the viewport (and user is seeing it) for a set time by [debounce](TBD...).
- 🤖 Built-in [auto-retry](TBD...) mechanism. User won't miss out your important image information.
- 🚫 Abort any current image downloads on component unmount potentially saving bandwidth and browser resources.
- 🔍 Support server-side rendering for SEO.
- 📜 Support [TypeScript](https://www.typescriptlang.org) type definition.
- 🐦 Tiny size ([~ 2.2kB gzipped](https://bundlephobia.com/result?p=react-cool-img)). No external dependencies, aside for the `react` and `react-dom`.
- 🔧 Easy to use.

> ⚠️ IntersectionObserver is already [supported by all major modern browsers](https://caniuse.com/#feat=intersectionobserver). You can also [add the polyfill](TBD...) for full browser support.

## Requirements

This component is based on [React Hooks](https://reactjs.org/docs/hooks-intro.html). It requires `react v16.8+` and `react-dom v16.8+`.
