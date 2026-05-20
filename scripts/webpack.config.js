/**
 * Import @wordpress/scripts base webpack config.
 * @see https://github.com/WordPress/gutenberg/tree/master/packages/scripts#extending-the-webpack-config
 */
const path = require( 'path' );
const wpScriptsConfig = require( '@wordpress/scripts/config/webpack.config' );

// When @newfold/wp-module-ai-chat is linked via file:../, webpack resolves externals
// (e.g. @wordpress/icons) from paths under wp-module-ai-chat/build/ and never reaches
// this package's node_modules. Prefer the consumer's node_modules for those peers.
const helpCenterNodeModules = path.resolve( __dirname, '..', 'node_modules' );
wpScriptsConfig.resolve = {
	...wpScriptsConfig.resolve,
	modules: [
		helpCenterNodeModules,
		...( wpScriptsConfig.resolve?.modules || [ 'node_modules' ] ),
	],
};

module.exports = wpScriptsConfig;
