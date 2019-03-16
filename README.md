<h1 align="center">ModuloX</h1>
<p align="center">
	Core building blocks for your UI in React.
</p>

<p align="center">
    <a href="https://travis-ci.org/JavascriptFox/modulox"><img src="https://img.shields.io/travis/JavascriptFox/modulox/master.svg" alt="Build Status"></a>
    <a href="https://codecov.io/gh/JavascriptFox/modulox"><img src="https://codecov.io/gh/JavascriptFox/modulox/branch/master/graph/badge.svg" alt="Code coverage"></a>
    <a href="https://github.com/JavascriptFox/modulox/releases"><img src="https://img.shields.io/npm/v/@javascriptfox/modulox.svg?colorB=orange" alt="Latest Release"></a>
    <a href="https://github.com/JavascriptFox/modulox/blob/master/LICENSE"><img src="https://img.shields.io/github/license/JavascriptFox/modulox.svg?colorB=blue" alt="License"></a>
</p>

Just another robust UI library that tries to solve every problem? No way. ModuloX is a small and lightweight library that contains core building blocks which helps you to build your UI in React. Scalable, easy to use, perfect for prototyping. Enjoy.

## Why?

Because working with styles is always a pain. As your application grows, it's tough not to lose your mind, even harder when the project has to be perfect on all kinds of different screen sizes. ModuloX enables you to easily specify your styles via props for all breakpoints you defined in your theme.

## Getting started

Install the package with npm:

```sh
$ npm i @javascriptfox/modulox
```

## Documentation

Let's start with an example:

<img src="https://github.com/JavascriptFox/modulox/blob/master/examples/intro/code.png" alt="ModuloX example">

**Row** - Keeps children in one row (obviously) with space between
**Box** - Basic block, you can use align/justify props with this component (it's display flex by default)

This code will output two boxes that are in one row with width and height of 250px for each box. Boxes will change it's size on smaller screens to 100px.

What the hell is this?

```sh
height="t:|100px|, m:|250px|"
```

This is breakpoint style syntax (got to work on the name), which basically allows you to write media queries for this component in one line. These are the default breakpoints:

```sh
{ size: `xt`, prefix: `t:`, minWidth: 0 },
{ size: `xs`, prefix: `s:`, minWidth: 565 },
{ size: `xm`, prefix: `m:`, minWidth: 769 },
{ size: `xl`, prefix: `l:`, minWidth: 1200 },
{ size: `xg`, prefix: `g:`, minWidth: 1980 }
```

Legend: | **t** = _tiny_ | **s** = _small_ | **m** = _medium_ | **l** = _large_ | **g** = _gigantic_ |

In a nutshell, if you want to have different styles for a specific breakpoint, you pick up the prefix that is connected to that breakpoint and put a value inside brackets/pipes / whatever.

In the example above, the height of the component will be 100px on tiny screens up to medium screens, which starts on **769px** by default. Height will be 250px on this component if the screen size is 769px or bigger.

If you want to use only one rule for each breakpoint, pass only one value without any prefix like this:

```sh
height="200px"
```

# ... Rest of the documentation is in progress ...

## Customize theme

Behind the scene, ModuloX is using the default theme, which looks like this:

```sh
const theme = {
  breakpoints: [
    { size: `xt`, prefix: `t:`, minWidth: 0 },
    { size: `xs`, prefix: `s:`, minWidth: 565 },
    { size: `xm`, prefix: `m:`, minWidth: 769 },
    { size: `xl`, prefix: `l:`, minWidth: 1200 },
    { size: `xg`, prefix: `g:`, minWidth: 1980 }
  ],
  splitter: `,`,
  colors: {
    red: '#d41111',
    blue: '#add8e6',
    green: '#228B22'
  },
  typography: {
    fonts: {
      h1: "'Playfair Display', sans-serif",
      h2: "'Playfair Display', sans-serif",
      h3: "'Playfair Display', sans-serif",
      h4: "'Playfair Display', sans-serif",
      h5: "'Playfair Display', sans-serif",
      h6: "'Playfair Display', sans-serif",
      p: "'Roboto', serif",
      li: "'Roboto', serif",
      span: "'Roboto', serif",
      small: "'Roboto', serif"
    },
    sizes: {
      h1: 't:|24px|, m:|36px|, l:|42px|',
      h2: 't:|21px|, m:|32px|, l:|38px|',
      h3: 't:|19px|, m:|28px|, l:|34px|',
      h4: 't:|18px|, m:|26px|, l:|31px|',
      h5: 't:|17px|, m:|22px|, l:|26px|',
      h6: 't:|16px|, m:|19px|, l:|22px|',
      p: 't:|16px|, m:|16px|, l:|16px|',
      li: 't:|16px|, m:|16px|, l:|16px|',
      span: 't:|15px|, m:|15px|, l:|15px|',
      small: 't:|12px|, m:|12px|, l:|12px|'
    },
    weights: {
      h1: 't:|900|, m:|900|, l:|900|',
      h2: 't:|900|, m:|900|, l:|900|',
      h3: 't:|700|, m:|700|, l:|700|'
    }
  }
}
export default theme
```

You can override default theme by defining your own theme and passing it down to the children via Context API. Keep in mind, that you should keep up the structure of the theme as it's defined here. Without that, your modular components will not work properly.

... Customizing the theme is in progress, will be much easier ...

## Todo

<p>[ ] Add more components (Link, Image, Icon...)</p><br />
<p>[ ] Add animations properties</p><br />
<p>[ ] Add whatever useful that comes to my mind</p>

## License

MIT
