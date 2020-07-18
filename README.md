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

All Fragments, i.e., <code>Div</code>, <code>Text</code>, <code>Button</code>, <code>List</code>, share the same core API. Some of them have extended functionality or can receive another set of props, but let's look at the core API that is common across all of them.

### Core API - Any Fragment can accept all these props

Prop | CSS key | Append unit | Theme value path | Default value path | Fallback value--- | --- | --- | --- | --- | ---`display` | display | - | - | - | -`direction` | flex-direction | - | - | - | -`align` | align-items | - | - | - | -`justify` | justify-content | - | - | - | -`margin` | margin | px | - | - | -`padding` | padding | px | - | - | -`width` | width | px | - | - | -`height` | height | px | - | - | -`maxWidth` | max-width | px | - | - | -`maxHeight` | max-height | px | - | - | -`minWidth` | min-width | px | - | - | -`minHeight` | min-height | px | - | - | -`background` | background | - | _colors_ | - | -`color` | color | - | _colors_ | - | -`position` | position | - | - | - | -`cursor` | cursor | - | - | - | -`gapVertical*` | margin-bottom | px | _gaps.vertical_ | - | -`gapHorizontal*` | margin-right | px | _gaps.horizontal_ | - | -

As you can see, most of the prop keys reflect the CSS keys. Some of them omitted the unnecessary parts, so we can keep the props short and clean. You can check the CSS key to be sure what will be the output of passed prop.

There's an extra prop you can pass down called <code>styles</code>, which takes a raw CSS string and generates styles out of it. Beware that if you, for example, specify width with prop and then specify a width in <code>styles</code> prop as well, the latter one will be used.

#### Example usage:
```sh
<Div width={200} background="greyDark" position="relative">
	<Div width={15} height={15} position="absolute" styles="top: 5px; left: 5px;" background="red" />
	<Div width="100%" maxWidth={500} display="m:|none| d:|block|" />
</Div>
```

So what is <code>appendUnit</code>, <code>themePath</code>, and <code>defaultValue</code>? These are just extra information used internally to generate more sophisticated styles and fallback to the theme or default values. For instance, the <code>background</code> prop mirrors the CSS background property, and since we always expect the string to be passed, we don't need to append <code>px</code> to the end. We don't want to fall back to any <code>defaultValue</code>, but we want to select a variable from the theme if present. In this case, if you pass down the prop like this - <code>background="red"</code> we will first check the <code>colors</code> in theme, and if the red is not specified there, we use it directly. If you specified the red in theme to be <code>#d41111</code>, that value would be used instead.

TLDR; the only relevant thing for you is to know which prop mirrors the specific CSS property. Extra information there is just for you to know what's going on internally. There's no way to change this setup at this moment, but you can customize your theme as you please.

There are also two extra properties called <code>gapHorizontal</code> and <code>gapVertical</code>, which may confuse you since you probably haven't used anything like that in CSS. These are a bit special ones - they don't apply the style directly on the Fragment to which you've passed these props, rather on all children except the last one. For instance, if you have a row with three children and have consistent gaps between them, you can pass down the <code>gapHorizontal="10px"</code> and see that each child except the last one has now <code>margin-right: 10px;</code>. Pretty cool, isn't it? Bonus - you can set variables for gaps in theme, so all the gaps across your app are consistent, and you don't hardcode values.

Now, the Core API also makes use of shorthand props, which are just booleans. You can pass these props to any Fragment:

Prop | CSS output--- | ---`row` | display: flex; flex-direction: row;`column` | display: flex; flex-direction: column;`hidden` | display: none;


As you can see, I only specified the prop key and the CSS output. Since they are just booleans, you can pass them like this:

```sh
<Div row>
	<Div>Now I</Div>
	<Div>will be in a row with me.</Div>
</Div>
```

To put it simply, both display and flex-direction properties will be generated. The purpose of these shorthands is to reduce the props that are repeated over and over.

### Div

Div Fragment is the purest of all Fragments since it doesn't do anything except what you tell it. It doesn't have any default values, so if you render a <code>Div</code> without any prop, it will be as if you rendered the raw HTML div.

This Fragment does not extend the Core API, so only the props specified in the reference above will be transformed into CSS styles.

### List

List Fragment is a tiny non-style extension to the Div. It requires these two props:

* <code>data</code> as either <code>Array</code> or <code>Object</code>
* <code>children</code> as a <code>Function</code>

The example usage of the List is following:

```sh
<List data={[
	{ id: '1', name: 'Martin' },
	{ id: '2', name: 'Frank' },
	{ id: '3', name: 'Ema' }
]}>
	{person => (
		<Div key={person.id}>{person.name}</Div>
	)}
</List>
```

As you can see, it's just a tiny helper for you to map things, and make it a bit cleaner. If you pass down the <code>Object</code>, the param in the callback would be the key.

### Text

Text Fragment is an extension of Core API and comes with another set of props you can pass down on top of what you can pass to Div.

Prop | CSS key | Append unit | Theme value path | Default value path | Fallback value--- | --- | --- | --- | --- | ---`font` | font-family | - | _typography.fontFamilies_ | _typography.defaultFontFamily_ | inherit`size` | font-size | px | _typography.fontSizes_ | _typography.defaultFontSize_ | 100%`weight` | font-weight | - | - | - | -`space` | white-space | - | - | - | -`letterSpacing` | letter-spacing | px | - | - | -`lineHeight` | line-height | - | - | - | -

The default values for <code>font-family</code> and <code>font-size</code> fallbacks to the theme, and if these are not specified, they fallback to <code>inherit</code> and <code>100%</code> respectively. You can also specify a variety of fonts and sizes to pass down a variable representing a specific font family or font size. Stay consistent.

Prop | CSS output--- | ---`uppercase` | text-transform: uppercase;`underline` | text-decoration: underline;`center` | text-align: center;`block` | display: block;

### Button

Button Fragment is an extension of Core API in the same way as Text Fragment. On top of that, it comes with some default styles to make the button look like from the 21st century, and not like the button your grandad used to click on back in the 90s. The default styles are the following:

```sh
margin: 0;
padding: 8px 14px;
border: none;
border-radius: 4px;
```

If the font-family and font-size are not specified, the fallback values for both are the same as in the case of Text Fragment.

## TODO

- [ ] Add fields (Input, Select, Checkbox...)
- [ ] Add components for quick scaffolding
- [ ] Add animations properties

## License

MIT
