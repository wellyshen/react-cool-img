> 🧪 This package is under testing, API might be changed rapidly. Please note any changes via [release](https://github.com/wellyshen/react-cool-img/releases). Full document will be provided as soon as possible.

# React Cool Img

React Cool Img is a lightweight React `<Img />` component, which helps you handle image UX (user experience) and performance optimization as a professonal guy 🤓

It empowers the standard [img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag by many cool [features](#features) without breaking your original development experience. Ideally, it can be an `img` tag replacement for [React.js](https://reactjs.org).

Live demo: https://keen-goldwasser-415880.netlify.com

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
- ⏳ An image can wait to be downloaded when it's in the viewport (and user is seeing it) for a set time by [debounce](#observerconfig).
- 🤖 Built-in [auto-retry](#retry) mechanism. User won't miss out your important image information.
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
$ yarn add react-cool-img
# or
$ npm install --save react-cool-img
```

## Quick Start

The default props of the component has been fine-tuned for the purpose of loading optimization. Let's start it as the following example.

```js
import Img from 'react-cool-img';

// Suggest to use low quality or vector images
import loadingImage from './images/loading.gif';
import errorImage from './images/error.svg';

const App = () => (
  <Img
    placeholder={loadingImage}
    src="https://a-cool-image"
    error={errorImage}
    alt="React Cool Img"
  />
);
```

## API

The image component working similar with standard `img` tag and with the following props.

| Prop             | Type    | Default                                                             | Required | Description                                                                                                                                                                                                   |
| ---------------- | ------- | ------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`            | string  |                                                                     | ✓        | Image source <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                                                                  |
| `srcSet`         | string  |                                                                     |          | Image sources for responsive images. For `src` prop only <br />[Reference article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)                            |
| `sizes`          | string  |                                                                     |          | Image sizes for responsive images. For `src` prop only <br />[Reference article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)                              |
| `placeholder`    | string  |                                                                     |          | Placeholder image source <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                                                      |
| `error`          | string  |                                                                     |          | Error image source. It'll replace Placeholder image <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                           |
| `alt`            | string  |                                                                     |          | An alternate text for an image section                                                                                                                                                                        |
| `decode`         | boolean | `true`                                                              |          | Use [img.decode()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode) to pre-decode the image before render it. Useful to prevent main thread from blocking by decoding of large image |
| `lazy`           | boolean | `true`                                                              |          | Turn on/off lazy-loading                                                                                                                                                                                      |
| `observerConfig` | object  | `{ root: null, rootMargin: '50px',threshold: 0.01, debounce: 300 }` |          | See the [observerConfig](#observerconfig) section                                                                                                                                                             |
| `retry`          | object  | `{ count: 3, delay: 2, acc: '*' }`                                  |          | See the [retry](#retry) section                                                                                                                                                                               |

### observerConfig

Comming Soon...

### retry

Comming Soon...

## Intersection Observer Polyfill

[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) has already gained wide support by most modern browsers ([check it](https://caniuse.com/#feat=intersectionobserver)). If you wish to support full browser then you need polyfill.

Polyfills is something you should do consciously at the application level. Therefore `react-cool-img` doesn't include it.

You can use the [polyfill](https://www.npmjs.com/package/intersection-observer) from w3c:

```sh
$ yarn add intersection-observer
# or
$ npm install --save intersection-observer
```

Then import it at your app's entry point:

```js
import 'intersection-observer';
```

Or load the polyfill only if needed:

```js
if (!window.IntersectionObserver) require('intersection-observer');
```

[Polyfill.io](https://polyfill.io/v3) is an alternative way to add the polyfill when needed.
