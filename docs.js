const fs = require('fs-extra');
const path = require('path');

const rootPath = path.resolve(__dirname);

const blueprints = require('./src/fragments/blueprints');

const README = fs.readFileSync(`${rootPath}/README.md`, 'utf8');

// Split the README from the API reference
const readmeArr = README.split('## API reference');

function generateDefaultApiReference(blueprint) {
  const {
    key,
    cssKey,
    appendUnit,
    themeValuePath,
    defaultValuePath,
    defaultValueFallback,
  } = blueprint;

  return (
    `\`${key.includes('gap') ? `${key}*` : key}\` | ` +
    `${cssKey || key} | ` +
    `${appendUnit || '-'} | ` +
    `${themeValuePath ? `_${themeValuePath}_` : '-'} | ` +
		`${defaultValuePath ? `_${defaultValuePath}_` : '-'} | ` +
		`${defaultValueFallback || '-'}\r`
  );
}

function generateShorthandApiReference(blueprint) {
  const { key, cssKey, cssValue, cssProp } = blueprint;

  const cssProperties = cssProp || `${cssKey || key}: ${cssValue};`;

  return `\`${key}\` | ` + `${cssProperties}\r`;
}

// This table header is used for the API reference to see which props I can pass
// And how they are transformed, what is fallback value, etc.
const defaultTableHeader =
  'Prop | CSS key | Append unit | Theme value path | Default value path | Fallback value\r--- | --- | --- | --- | --- | ---\r';
const shorthandTableHeader = 'Prop | CSS output\r--- | ---\r';

function generateApiReference(fragmentBlueprints) {
  return fragmentBlueprints.reduce(
    (agg, blueprint) => {
      const key =
        blueprint.cssValue || blueprint.cssProp ? 'shorthand' : 'default';
      const fn =
        key === 'shorthand'
          ? generateShorthandApiReference
          : generateDefaultApiReference;

      agg[key] += fn.call(null, blueprint);
      return agg;
    },
    { default: defaultTableHeader, shorthand: shorthandTableHeader }
  );
}

// Iterate through the blueprints and get 2 separate parts of Core API
// First part will represent the props without shorthand (using the default table header)
// Second part is about shorthands and displaying only prop and generated css string (since there are no other columns needed)
const apiCoreReference = generateApiReference(blueprints.core);
const apiTextReference = generateApiReference(blueprints.text);

// API reference initialization
let apiReference = '';

// Intro to the API reference
apiReference += `## API reference\n\nAll Fragments, i.e., <code>Div</code>, <code>Text</code>, <code>Button</code>, <code>List</code>, share the same core API. Some of them have extended functionality or can receive another set of props, but let's look at the core API that is common across all of them.\n\n`;
// Core API reference
apiReference += `### Core API - Any Fragment can accept these props (see the first column)\n\n${apiCoreReference.default}\n
As you can see, most of the prop keys reflect the CSS keys. Some of them omitted the unnecessary parts, so we can keep the props short and clean. You can check the CSS key to be sure what will be the output of passed prop.\n
#### Extra props\n
Prop | CSS output\r--- | ---\r
<code>styles</code> | *css string you pass down*\r
<code>hover</code> | *css string you pass down*\r\n
Extra props accept the CSS string with multiple values that have to be separated by <code>;</code>. Beware that if you, for example, specify width with prop and then specify a width in <code>styles</code> prop as well, the latter one will be used.\n
#### Example usage:
\`\`\`sh
<Div width={200} background="greyDark" position="relative">
	<Div width={15} height={15} position="absolute" background="red" styles="color: red; top: 5px; left: 5px;" />
	<Div width="100%" maxWidth={500} display="m:|none| d:|block|" />
</Div>
\`\`\`\n
So what is <code>appendUnit</code>, <code>themePath</code>, and <code>defaultValue</code>? These are just extra information used internally to generate more sophisticated styles and fallback to the theme or default values. For instance, the <code>background</code> prop mirrors the CSS background property, and since we always expect the string to be passed, we don't need to append <code>px</code> to the end. We don't want to fall back to any <code>defaultValue</code>, but we want to select a variable from the theme if present. In this case, if you pass down the prop like this - <code>background="red"</code> we will first check the <code>colors</code> in theme, and if the red is not specified there, we use it directly. If you specified the red in theme to be <code>#d41111</code>, that value would be used instead.\n
Note that for <code>styles</code> and <code>hover</code>, we also try to parse the values from theme (so you can still make use of variables), but there's no way to use breakpoint style syntax in there now.\n
**TLDR;** just check out which props you can pass down to the Fragments and see which CSS property will be generated out of it in the second column. The other columns represent the internal settings, and demonstrate what's going on behind the scene. There's no way to change this setup at this moment, but you can customize your theme as you please.\n
There are also two extra properties called <code>gapHorizontal</code> and <code>gapVertical</code>, which may confuse you since you probably haven't used anything like that in CSS. These are a bit special ones - they don't apply the style directly on the Fragment to which you've passed these props, rather on all children except the last one. For instance, if you have a row with three children and have consistent gaps between them, you can pass down the <code>gapHorizontal="10px"</code> and see that each child except the last one has now <code>margin-right: 10px;</code>. Pretty cool, isn't it? Bonus - you can set variables for gaps in theme, so all the gaps across your app are consistent, and you don't hardcode values.\n\n`;
// Shorthand API reference
apiReference += `#### Shorthand props\n
Now, the Core API also makes use of shorthand props, which are just booleans. You can pass these props to any Fragment:\n\n${apiCoreReference.shorthand}\n\n
As you can see, I only specified the prop key and the CSS output. Since they are just booleans, you can pass them like this:\n
\`\`\`sh
<Div row>
	<Div>Now I</Div>
	<Div>will be in a row with me.</Div>
</Div>
\`\`\`\n
To put it simply, both display and flex-direction properties will be generated. The purpose of these shorthands is to reduce the props that are repeated over and over.\n\n`;
// Fragments in detail
apiReference += `### Div\n
Div Fragment is the purest of all Fragments since it doesn't do anything except what you tell it. It doesn't have any default values, so if you render a <code>Div</code> without any prop, it will be as if you rendered the raw HTML div.\n
This Fragment does not extend the Core API, so only the props specified in the reference above will be transformed into CSS styles.\n
### List\n
List Fragment is a tiny non-style extension to the Div. It requires these two props:\n
* <code>data</code> as either <code>Array</code> or <code>Object</code>
* <code>children</code> as a <code>Function</code>\n
The example usage of the List is following:\n
\`\`\`sh
<List data={[
	{ id: '1', name: 'Martin' },
	{ id: '2', name: 'Frank' },
	{ id: '3', name: 'Ema' }
]}>
	{person => (
		<Div key={person.id}>{person.name}</Div>
	)}
</List>
\`\`\`\n
As you can see, it's just a tiny helper for you to map things, and make it a bit cleaner. If you pass down the <code>Object</code>, the param in the callback would be the key.\n
### Text\n
Text Fragment is an extension of Core API and comes with another set of props you can pass down on top of what you can pass to Div.\n
${apiTextReference.default}\n
The default values for <code>font-family</code> and <code>font-size</code> fallbacks to the theme, and if these are not specified, they fallback to <code>inherit</code> and <code>100%</code> respectively. You can also specify a variety of fonts and sizes to pass down a variable representing a specific font family or font size. Stay consistent.\n
#### Shorthand props\n
${apiTextReference.shorthand}\n
### Button\n
Button Fragment is an extension of Core API in the same way as Text Fragment. **That means, you can use the same props as you could for Text Fragment (see the Text Fragment API reference above).**
\nOn top of that, it comes with some default styles to make the button look like from the 21st century, and not like the button your grandad used to click on back in the 90s. The default styles are the following:\n
\`\`\`sh
margin: 0;
padding: 8px 14px;
border: none;
border-radius: 4px;
cursor: pointer || not-allowed; // By default pointer, not-allowed in case we pass down disabled flag
\`\`\`\n
If the font-family and font-size are not specified, the fallback values for both are the same as in the case of Text Fragment.\n`;
// Attach header for the next part
apiReference += '\n## TODO';

// Readme parts (first and last is untouched, the second one is generated from blueprints)
const readmeParts = [
  readmeArr[0],
  apiReference,
  readmeArr[1].split('## TODO')[1],
].join('');

// Write the generated API reference to the README
fs.writeFileSync(`${rootPath}/README.md`, readmeParts);
