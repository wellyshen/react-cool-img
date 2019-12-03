> 🧪 This package is under testing, API might be changed rapidly. Please note any changes via [release](https://github.com/wellyshen/react-cool-img/releases). Full document will be provided as soon as possible.

# React Cool Img

React Cool Img is a lightweight React `<Img />` component, which helps you handle image UX (user experience) and performance optimization as a professional guy 🤓

It empowers the standard [img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag by many cool [features](#features) without breaking your original development experience. Ideally, it can be an `img` tag replacement for [React.js](https://reactjs.org).

⚡️ Live demo: https://keen-goldwasser-415880.netlify.com

[![build status](https://img.shields.io/travis/wellyshen/react-cool-img/master?style=flat-square)](https://travis-ci.org/wellyshen/react-cool-img)
[![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-img?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-img?branch=master)
[![npm version](https://img.shields.io/npm/v/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-cool-img?style=flat-square)](https://bundlephobia.com/result?p=react-cool-img)
[![MIT licensed](https://img.shields.io/github/license/wellyshen/react-cool-img?style=flat-square)](https://raw.githubusercontent.com/wellyshen/react-cool-img/master/LICENSE)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-img)](https://twitter.com/intent/tweet?text=With%20@React-Cool-Img,%20my%20web%20app%20becomes%20more%20powerful.%20Thanks,%20@Welly%20Shen%20🤩)

## Features

- 🖼 Placeholders for satisfying various image loading states (e.g. loading image > actual image > error image).
- 🛋 Lazy image loading with modern, performant implementation, using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
- ⏳ An image can wait to be downloaded while it's in the viewport (and user is seeing it) for a set time by [debounce](#observerconfig).
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

The [default props](#api) of the component has been fine-tuned for the purpose of loading optimization. Let's start it as the following example.

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

Don't want an image placeholder? No worries, you can use CSS or inline styles for it. The component is fully compatible with the development experience of normal `img` tag.

```js
import Img from 'react-cool-img';

const App = () => (
  <Img
    style={{ backgroundColor: 'silver', width: '480', height: '320' }}
    src="https://a-cool-image"
    alt="React Cool Img"
  />
);
```

## API

The image component working similar with standard `img` tag and with the following props.

| Prop             | Type    | Default                                                              | Description                                                                                                                                                                                                   |
| ---------------- | ------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`            | string  |                                                                      | Image source. It's `required` <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                                                 |
| `srcSet`         | string  |                                                                      | Image sources for responsive images. For `src` prop only <br />[Reference article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)                            |
| `sizes`          | string  |                                                                      | Image sizes for responsive images. For `src` prop only <br />[Reference article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)                              |
| `width`          | string  |                                                                      | Width of the image in px                                                                                                                                                                                      |
| `height`         | string  |                                                                      | Height of the image in px                                                                                                                                                                                     |
| `placeholder`    | string  |                                                                      | Placeholder image source <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                                                      |
| `error`          | string  |                                                                      | Error image source. It'll replace Placeholder image <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                           |
| `alt`            | string  |                                                                      | An alternate text for an image section                                                                                                                                                                        |
| `lazy`           | boolean | `true`                                                               | Turn on/off lazy-loading <br />[Using Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)                                                                      |
| `decode`         | boolean | `true`                                                               | Use [img.decode()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode) to pre-decode the image before render it. Useful to prevent main thread from blocking by decoding of large image |
| `observerConfig` | object  | `{ root: null, rootMargin: '50px', threshold: 0.01, debounce: 300 }` | See the [observerConfig](#observerconfig) section                                                                                                                                                             |
| `retry`          | object  | `{ count: 3, delay: 2, acc: '*' }`                                   | See the [retry](#retry) section                                                                                                                                                                               |

### observerConfig

All the properties are `optional`.

- `root: Element | null` - the element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if `null`.
- `rootMargin: string` - margin around the root. Can have values similar to the CSS [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) property, e.g. `'10px 20px 30px 40px'` (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections.
- `threshold: number` - a single number between 0 and 1, which indicate at what percentage of the target's visibility the observer's callback should be executed. A value of 0 means as soon as even one pixel is visible, the callback will be run. 1 means that the threshold isn't considered passed until every pixel is visible.
- `debounce: number` - specifies how much to wait in milliseconds that the image has to be in viewport before starting to load. This can help avoid wasting bandwidth and processing time while the user scrolls quickly past them. A value of 0 means the image to be loaded immediately.

### retry

All the properties are `optional`.

- `count: number` - specifies the number of times you want to retry. Set it to 0 will disable auto-retry.
- `delay: number` - specifies the delay between retries in seconds.
- `acc: string | false` - specifies how the delay should be accumulated with each retry. It accepts the following values:
  - `'*' (default)` - multiply delay after each subsequent retry by the given `delay` value, e.g. `delay: 2` means retry will run after 2 seconds, 4 seconds, 8 seconds, and so on.
  - `'+'` - increment delay after each retry by the given `delay` value, e.g. `delay: 2` means retry will run after 2 seconds, 4 seconds, 6 seconds, and so on.
  - `false` - keep the delay constant between retries, e.g. `delay: 2` means retry will run every 2 seconds.

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
