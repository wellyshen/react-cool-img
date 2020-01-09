# React Cool Img

This is a lightweight React `<Img />` component, which helps you handle image UX (user experience) and performance optimization as a professional guy 🤓

It empowers the standard [`img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag by many cool [features](#features) without breaking your original development experience. Ideally, it can be an `img` tag replacement for [React.js](https://reactjs.org).

⚡️ Live demo: https://react-cool-img.org

❤️ it? ⭐️ it on [GitHub](https://github.com/wellyshen/react-cool-img/stargazers) or [Tweet](https://twitter.com/intent/tweet?text=With%20@React-Cool-Img,%20my%20web%20app%20becomes%20more%20powerful.%20Thanks,%20@Welly%20Shen%20🤩) about it.

[![build status](https://img.shields.io/travis/wellyshen/react-cool-img/master?style=flat-square)](https://travis-ci.org/wellyshen/react-cool-img)
[![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-img?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-img?branch=master)
[![npm version](https://img.shields.io/npm/v/react-cool-img?style=flat-square)](https://www.npmjs.com/package/react-cool-img)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-img?style=flat-square)](https://www.npmtrends.com/react-cool-img)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-img?style=flat-square)](https://www.npmtrends.com/react-cool-img)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-cool-img?style=flat-square)](https://bundlephobia.com/result?p=react-cool-img)
[![MIT licensed](https://img.shields.io/github/license/wellyshen/react-cool-img?style=flat-square)](https://raw.githubusercontent.com/wellyshen/react-cool-img/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange?style=flat-square)](#contributors-)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/wellyshen/react-cool-img/blob/master/CONTRIBUTING.md)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-img)](https://twitter.com/intent/tweet?text=With%20@react-cool-img,%20my%20web%20app%20becomes%20more%20powerful.%20Thanks,%20@Welly%20Shen%20🤩)

## Features

- 🖼 Placeholders for satisfying various image loading states (e.g. loading image > actual image > error image).
- 🛋 [Smart lazy loading](#the-smart-way-to-load-images) with performant and efficient way, using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
- 🤖 Built-in [auto-retry](#retry) mechanism. User won't miss out your important information.
- 🚫 Abort any current image downloads on component unmount potentially saving bandwidth and browser resources.
- 🔍 [Support server-side rendering / Javascript is disabled / SEO](#javascript-availability-and-seo).
- 📜 Support [TypeScript](https://www.typescriptlang.org) type definition.
- 🦠 Tiny size ([~ 2.4kB gzipped](https://bundlephobia.com/result?p=react-cool-img)). No external dependencies, aside for the `react` and `react-dom`.
- 🔧 Easy to use.

> ⚠️ [Most modern browsers support Intersection Observer natively](https://caniuse.com/#feat=intersectionobserver). You can also [add polyfill](#intersection-observer-polyfill) for full browser support.

## Requirement

`react-cool-img` is based on [React Hooks](https://reactjs.org/docs/hooks-intro.html). It requires `react v16.8+`.

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
    src="https://the-image-url"
    error={errorImage}
    alt="React Cool Img"
  />
);
```

Don't want an image placeholder? No worries, you can use [inline styles](https://reactjs.org/docs/dom-elements.html#style) or CSS for it. The component is fully compatible with the development experience of normal `img` tag.

```js
import Img from 'react-cool-img';

const App = () => (
  <Img
    style={{ backgroundColor: 'grey', width: '480', height: '320' }}
    src="https://the-image-url"
    alt="React Cool Img"
  />
);
```

## API

The image component working similar with standard `img` tag and with the following props.

| Prop              | Type    | Default                                               | Description                                                                                                                                                                                                                     |
| ----------------- | ------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`             | string  |                                                       | Image source. It's `required`. <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                                                                  |
| `srcSet`          | string  |                                                       | Image sources for responsive images. For `src` prop only. <br />[Reference article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)                                             |
| `sizes`           | string  |                                                       | Image sizes for responsive images. For `src` prop only. <br />[Reference article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)                                               |
| `width`           | string  |                                                       | Width of the image in px.                                                                                                                                                                                                       |
| `height`          | string  |                                                       | Height of the image in px.                                                                                                                                                                                                      |
| `placeholder`     | string  |                                                       | Placeholder image source. <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                                                                       |
| `error`           | string  |                                                       | Error image source. It'll replace Placeholder image. <br />[Support formats](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                                                                            |
| `alt`             | string  |                                                       | An alternate text for an image section.                                                                                                                                                                                         |
| `decode`          | boolean | `true`                                                | Use [img.decode()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode) to pre-decode the image before render it. Useful to prevent main thread from blocking by decoding of large image.                  |
| `lazy`            | boolean | `true`                                                | Turn on/off lazy loading. <br />[Using Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)                                                                                       |
| `cache`           | boolean | `true`                                                | Instantly load images which have been cached when possible to abort the lazy loading behavior. <br />[Reference article](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching) |
| `debounce`        | number  | `300`                                                 | How much to wait in milliseconds that the image has to be in viewport before starting to load. This can prevent images from being downloaded while the user scrolls quickly past them.                                          |
| `observerOptions` | object  | `{ root: null, rootMargin: '50px', threshold: 0.01 }` | See the [observerOptions](#observeroptions) section.                                                                                                                                                                            |
| `retry`           | object  | `{ count: 3, delay: 2, acc: '*' }`                    | See the [retry](#retry) section.                                                                                                                                                                                                |
| `...`             |         |                                                       | Find more [props](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes) and [events](https://reactjs.org/docs/events.html#image-events).                                                                    |

### observerOptions

All the properties are `optional`.

- `root: Element | null` - the element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if `null`.
- `rootMargin: string` - margin around the root. Can have values similar to the CSS [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) property, e.g. `'10px 20px 30px 40px'` (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections.
- `threshold: number` - a single number between 0 and 1, which indicate at what percentage of the target's visibility the observer's callback should be executed. A value of 0 means as soon as even one pixel is visible, the callback will be run. 1 means that the threshold isn't considered passed until every pixel is visible.

### retry

All the properties are `optional`.

- `count: number` - specifies the number of times you want to retry. Set it to 0 will disable auto-retry.
- `delay: number` - specifies the delay between retries in seconds.
- `acc: string | false` - specifies how the delay should be accumulated with each retry. It accepts the following values:
  - `'*' (default)` - multiply delay after each subsequent retry by the given `delay` value, e.g. `delay: 2` means retry will run after 2 seconds, 4 seconds, 8 seconds, and so on.
  - `'+'` - increment delay after each retry by the given `delay` value, e.g. `delay: 2` means retry will run after 2 seconds, 4 seconds, 6 seconds, and so on.
  - `false` - keep the delay constant between retries, e.g. `delay: 2` means retry will run every 2 seconds.

## The Smart Way to Load Images

Lazy image loading via the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is good. But could it be greater to download an image only when user want to see it? Or bypass lazy loading for [cached images](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)? The answer is yes and these features already be built into `react-cool-img` by the [`debounce` and `cache`](#api) props.

By the `debounce` prop, an image can wait to be downloaded while it's in the viewport for a set time. In cases where you have a long list of images that the user might scroll through inadvertently. At this time loading images can cause unnecessary waste of bandwidth and processing time.

```js
import Img from 'react-cool-img';

import defaultImg from './images/default.svg';

const App = () => (
  <Img
    placeholder={defaultImg}
    src="https://the-image-url"
    debounce={1000} // Default is 300 (ms)
    alt="React Cool Img"
  />
);
```

By the `cache` prop, images you already have cached will abort lazy loading until user visit your app next time. Lazy loading is set up for any remaining images which were not cached. This is helpful for UX, because there's not much extra work to load cached images immediately and is an easy win for making the UI looks more intuitive.

```js
import Img from 'react-cool-img';

import defaultImg from './images/default.svg';

const App = () => (
  <Img
    placeholder={defaultImg}
    src="https://the-image-url"
    cache // Default is true, just for demo
    alt="React Cool Img"
  />
);
```

## JavaScript Availability and SEO

There're two challenges when doing lazy image loading with server-side rendering. One is Javascript availability the other is SEO. Fortunately, we can use [`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) tag to solve these problems. It will render the actual image as fallback if Javascript is disabled thus user won't see the image which be stuck with the placeholder. Moreover, the `<noscript>` tag ensure the image is indexed by search engine bots even if they cannot fully understand our JavaScript code. Take a look at how magic happens.

```js
// src/Img/index.tsx

const Img = () => {
  // ...

  return (
    <>
      <img
        class="image"
        src="https://the-placeholder-image"
        alt="There's no magic"
      />
      <noscript>
        <img
          class="image"
          src="https://the-actual-image"
          alt="The magic begins in here..."
        />
      </noscript>
    </>
  );
};
```

## Intersection Observer Polyfill

[Intersection Observer has good support amongst browsers](https://caniuse.com/#feat=intersectionobserver), but it's not universal. You'll need to polyfill browsers that don't support it. Polyfills is something you should do consciously at the application level. Therefore `react-cool-img` doesn't include it.

You can use W3C's [polyfill](https://www.npmjs.com/package/intersection-observer):

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/welly-shen-8b43287a/"><img src="https://avatars1.githubusercontent.com/u/21308003?v=4" width="100px;" alt=""/><br /><sub><b>Welly</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-img/commits?author=wellyshen" title="Code">💻</a> <a href="https://github.com/wellyshen/react-cool-img/commits?author=wellyshen" title="Documentation">📖</a> <a href="#maintenance-wellyshen" title="Maintenance">🚧</a></td>
  </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
