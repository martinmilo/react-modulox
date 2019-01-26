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

/*const fse = require('fs-extra')
const dir = __dirname
const getDirectory = path => dir && dir.includes(path)
	? dir.slice(0, dir.indexOf(path))
	: dir
const moduloxConfigPath = `${getDirectory('/node_modules')}/modulox.config.json`*/
