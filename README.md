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

Install ModuloX via npm:

```sh
$ npm install @javascriptfox/modulox --save-dev
```

```sh
$ yarn add @javascriptfox/modulox --dev
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

_... Rest of the documentation is in progress ..._

## Customize theme

Behind the scene, ModuloX is using the default theme. You can override this theme by generating your own theme and exporting all ModuloX components with your theme.

Let's generate a theme. We provided CLI utility to generate a theme and components file easily:

```sh
$	npx modulox init
```

```sh
$	yarn modulox init
```

Command should create 2 files - **modulox.theme.js** & **modulox.components.js**

You can add your own colors, breakpoints, fonts, override default properties defined in the theme you generated, but keep in mind, that you should keep the structure of the theme. For example, breakpoints and splitter is required, if you delete these, you wouldn't be able to use ModuloX.

Feel free to override existing breakpoint prefixes, sizes, min-widths or adding colors, defining your own line-heights, letter-spacings and so on.

Generated theme file should look like this: (if init command failed, just create your theme manually)

```sh
module.exports = {
  breakpoints: [
    { size: `xt`, prefix: `t:`, minWidth: 0 },
    { size: `xs`, prefix: `s:`, minWidth: 565 },
    { size: `xm`, prefix: `m:`, minWidth: 769 },
    { size: `xl`, prefix: `l:`, minWidth: 1200 },
    { size: `xg`, prefix: `g:`, minWidth: 1980 }
  ],
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
      a: "'Roboto', serif",
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
      a: 't:|16px|, m:|16px|, l:|16px|',
      li: 't:|16px|, m:|16px|, l:|16px|',
      span: 't:|15px|, m:|15px|, l:|15px|',
      small: 't:|12px|, m:|12px|, l:|12px|'
    },
    weights: {
      h1: 't:|900|, m:|900|, l:|900|',
      h2: 't:|900|, m:|900|, l:|900|',
      h3: 't:|700|, m:|700|, l:|700|'
    },
    lines: {
      h1: 1.35,
      h2: 1.375,
      h3: 1.4,
      h4: 1.45,
      h5: 1.475,
      h6: 1.5,
      p: 1.6,
      a: 1.6,
      li: 1.6,
      span: 1.7,
      small: 1.75
    },
    spaces: {
      h1: 0.25,
      h2: 0.2,
      h3: 0.15,
      h4: 0.1,
      h5: 0.1,
      h6: 0.1,
      p: 0.25,
      a: 0.25,
      li: 0.25,
      span: 0.3,
      small: 0.35
    }
  }
}
```

**After generating and defining your own theme**

Don't forget to open **modulox.components** and uncomment all lines to apply your theme! Then you need to import your components directly from this file.

Default modulox.components file should look like this:

```sh
import { Box, Row, List, Text } from '@javascriptfox/modulox'
import theme from './modulox.theme'

const MX = {
  Box: props => <Box theme={theme} {...props} />,
  Row: props => <Row theme={theme} {...props} />,
  List: props => <List theme={theme} {...props} />,
  Text: props => <Text theme={theme} {...props} />
}

export default MX
```

Now you can import ModuloX components directly from this file:

```sh
import MX from './modulox.components';

const { Box, Row, Text } = MX;

const MyReactComponent = () => {
	<Row>
		<Box hover="border-bottom: 1px solid red;">
			<Text space={0.5} transform="uppercase">Hello World!</Text>
		</Box>
		<Box display="t:|block|, m:|none|" background="red" width={50) height={50} />
	</Row>
}

export default MyReactComponent;
```

Another option is to pass the theme down via Context API. This way, you don't need to create **modulox.components** file, just your theme. Then you can create ThemeProvider and pass down your theme.

## Todo

- [ ] Add more components (Link, Image, Icon...)
- [ ] Add more flexibility customizing the theme
- [ ] Add animations properties
- [ ] Add whatever useful that comes to my mind

## License

MIT
