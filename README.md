# React Cool Img

React Cool Img is a lightweight React image component, which helps you handle image UX (user experience) and performance optimization as a professonal guy 🤓

It empowers the standard [img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag by many cool [features](#features) without breaking your original development experience. Ideally, it can be an <img> tag replacement for [React.js](https://reactjs.org).

See the demo: https://keen-goldwasser-415880.netlify.com

[![build status](https://img.shields.io/travis/wellyshen/react-cool-img/master?style=flat-square)](https://travis-ci.org/wellyshen/react-cool-img)
[![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-img?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-img?branch=master)
[![npm version](https://img.shields.io/npm/v/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-cool-img?style=flat-square)](https://bundlephobia.com/result?p=react-cool-img)
[![MIT licensed](https://img.shields.io/github/license/wellyshen/react-cool-img?style=flat-square)](https://raw.githubusercontent.com/wellyshen/react-cool-img/master/LICENSE)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-img)](https://twitter.com/intent/tweet?text=With%20@React-Cool-Img,%20my%20web%20app%20becomes%20more%20powerful.%20Thanks,%20@Welly%20Shen%20🤩)

## Features

- 🖼 Placeholders for satisfying various image loading states (e.g. loading image > acutal image > error image).
- 🛋 Lazy image loading with modern, performant implementation, using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
- ⏳ An image can wait to be downloaded when it's in the viewport (and user is seeing it) for a set time by [debounce](#debounce).
- 🤖 Built-in [auto-retry](#auto-retry) mechanism. User won't miss out your important image information.
- 🚫 Abort any current image downloads on component unmount potentially saving bandwidth and browser resources.
- 🔍 Support server-side rendering for SEO.
- 📜 Support [TypeScript](https://www.typescriptlang.org) type definition.
- 🦠 Tiny size ([~ 2kB gzipped](https://bundlephobia.com/result?p=react-cool-img)). No external dependencies, aside for the `react` and `react-dom`.
- 🔧 Easy to use.

> ⚠️ [Most modern browsers support Intersection Observer natively](https://caniuse.com/#feat=intersectionobserver). You can also [add polyfill](#intersectionobserver-polyfill) for full browser support.

## Requirements

`react-cool-img` is based on [React Hooks](https://reactjs.org/docs/hooks-intro.html). It requires `react v16.8+` and `react-dom v16.8+`.

## Installation

This package is distributed via [npm](https://www.npmjs.com/package/react-cool-img).

```sh
# Install using Yarn
$ yarn add react-cool-img
# or npm
$ npm install --save react-cool-img
```

## Quick Start

The default props of the component has been fine-tuned for the purpose of loading optimization. Let's start it as the following example.

```javascript
import Img from 'react-cool-img';

// Suggest to use low quality or vector images
import loadingImage from './images/loading.gif';
import errorImage from './images/error.svg';

const App = () => (
  <Img
    placeholder={loadingImage}
    src="https://the-image-url"
    error={errorImage}
    alt="React Cool Img"
  />
);
```

## API

The image component working similar with standard <img /> tag and with the following props.

Comming Soon...

### Debounce

Comming Soon...

### Auto-retry

Comming Soon...

## Intersection Observer Polyfill

[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API has already gained wide support by most modern browsers ([check it](https://caniuse.com/#feat=intersectionobserver)). If you wish to support full browser then you need polyfill. Polyfill is something you should do consciously at the application level. So, `react-cool-img` doesn't include it for you.

You can use the [polyfill](https://www.npmjs.com/package/intersection-observer) or use a service like [polyfill.io](https://polyfill.io/v3) to add it when needed.

```sh
# Install using Yarn
$ yarn add intersection-observer
# or npm
$ npm install --save intersection-observer
```

Then import it at your app's entry point:

```javascript
import 'intersection-observer';
```
