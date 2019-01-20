/*
	ModuloX - Core components to build your UI in React.
	A project by Martin Milo (@javascriptfox).
	This is the ModuloX config file - You can configure your own breakpoints
	splitter and other default variables for your project.
	Enjoy!
*/

module.exports = {
	breakpoints: [
		{ size: 'xs', prefix: 's:', minWidth: 0 },
		{ size: 'xm', prefix: 'm:', minWidth: 565 },
		{ size: 'xt', prefix: 't:', minWidth: 769 },
		{ size: 'xl', prefix: 'l:', minWidth: 1200 },
		{ size: 'xd', prefix: 'd:', minWidth: 1980 }
	],
	splitter: ','
}
