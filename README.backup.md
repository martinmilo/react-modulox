<h1 align="center">React ModuloX</h1>
<p align="center">Core building blocks for your UI in React.</p>

<p align="center">
    <a href="https://travis-ci.org/JavascriptFox/modulox"><img src="https://img.shields.io/travis/JavascriptFox/modulox/master.svg" alt="Build Status"></a>
    <a href="https://codecov.io/gh/JavascriptFox/modulox"><img src="https://codecov.io/gh/JavascriptFox/modulox/branch/master/graph/badge.svg" alt="Code coverage"></a>
    <a href="https://github.com/JavascriptFox/modulox/releases"><img src="https://img.shields.io/npm/v/@javascriptfox/modulox.svg?colorB=orange" alt="Latest Release"></a>
    <a href="https://github.com/JavascriptFox/modulox/blob/master/LICENSE"><img src="https://img.shields.io/github/license/JavascriptFox/modulox.svg?colorB=blue" alt="License"></a>
</p>

React ModuloX is a tiny, unopinionated UI library whose primary goal is to provide core building blocks for your React application. These blocks give you very intuitive API to handle complex theming and styling for various screen sizes.

## Why?

Because working with styles is always a pain. As your application grows, it's tough not to lose your mind, even harder when the project has to work perfectly on all kinds of screen sizes. Instead of manually handling media queries, and repeat yourself gazillion times with media queries syntax, you can pass down the simple string via props, and specify values for each breakpoint.

On top of that, you can leverage the power of theming and set your variables in a single place. Instead of hardcoding hex codes, font sizes, and other variables all over the place, you can reference a variable from the theme and make your life much more comfortable.

## Installation

```sh
npm install @javascriptfox/modulox --save-dev
```

```sh
yarn add @javascriptfox/modulox --dev
```

## Prerequisites

React ModuloX does not need any setup, but to use all features (especially breakpoint style syntax), you have to wrap your App in ThemeProvider.

```sh
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from '@javascriptfox/modulox'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

You don't have to pass down your own theme to <code>ThemeProvider</code>; if you don't specify the theme, the default one will be used implicitly. Check out the Theming section to learn more about theme generation and customization.

With this setup, you're basically good to go! 🚀

## Getting started

Core building blocks, called **Fragments**, are the backbone of React ModuloX. Under the hood, React ModuloX uses a powerful library <a href="https://styled-components.com/">styled-components</a>, which I definitely recommend to check out, and give it a shot. The fragments are nothing more than just styled-components with a simple config called blueprints - these serve as middleware between passed props and the styled-component, and transform certain props to more sophisticated styles.

Let's look at a very basic example to give you an overview of how it looks. I'm importing a <code>Div</code> and trying to make it with fixed-width on desktop devices (breakpoints are adjustable in theme), but I also want it to have 100% width on mobile devices. I want this <code>Div</code> to be slightly grey-ish, and use the variable I specified in my theme. Finally, I want this to use flexbox layout as a column because later on, I'll add more children components to this.

```sh
import { Div } from '@javascriptfox/modulox'

const App = () => (
	<Div width="s:|100%| d:|875px|" background="greyLight" direction="column" flex>
		I'm inside the Fragment!
	</Div>
)
```

The thing you are probably most interested (or confused about 🤯) in is this property:

```sh
s:|100%| d:|875px|
```

This is called breakpoint style syntax, and it allows you to pass simple string describing styles for multiple screen sizes. Behind these keys, <code>s</code> and <code>d</code> are values representing min-widths. You can override them in the theme file, and use your own keys describing the screen size with whatever name you prefer.

By default, you don't have to set up your own theme if you don't want to, but I highly recommend you do so. You can check out below in the Theming section how to quickly generate your theme file from a terminal, so you don't have to copy & paste the whole theme file from here manually.

This is how the part of the theme with breakpoints config looks like:

```sh
breakpoints: {
  s: 0,
  m: 576,
  t: 768,
  d: 992,
  l: 1200,
},
```

It's a super simple object that consists of min-width as a value and custom-named key. You can leave it out if you're satisfied with these breakpoints, you can add more breakpoints, or you can also replace both keys and values of existing ones. Remember that you have to specify the zeroth breakpoint, i.e., breakpoint with value of <code>0</code>.

If you have a value that you use on all screen sizes, you can omit breakpoint style syntax and pass a simple string or number.

```sh
<Div width="100%" height={100} />
```

One important thing to remember here is that if you pass down the value as a number, for specific keys (such as height), the <code>px</code> unit will be appended. The above example then outputs a height of 100px. You can check out the **API reference** to learn more about the configuration, and how specific keys are transformed.

## Theming

Let's generate a theme file for your awesome project. React ModuloX provides CLI utility to generate it by running this command.

```sh
npx modulox init
```

```sh
yarn modulox init
```

The output will be a <code>modulox.theme.js</code> file that is just a copy of the default theme. Feel free to adjust variables as you need.

```sh
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from '@javascriptfox/modulox'
import myAwesomeTheme from '<rootDir>/modulox.theme.js'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={myAwesomeTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

Be careful to replace the path for theme <code>\\<\rootDir\>/modulox.theme.js</code>. This is just an illustrative example, and the path and name of your theme depend on your settings.

## API reference

_... Work in progress ..._

## TODO

- [ ] Documentation 😕
- [ ] Add fields (Input, Select, Checkbox...)
- [ ] Add components for quick scaffolding
- [ ] Add animations properties

## License

MIT
