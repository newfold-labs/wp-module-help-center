const { defineConfig } = require('cypress');

module.exports = defineConfig({
	env: {
		wpUsername: 'admin',
		wpPassword: 'admin',
	},
	fixturesFolder: 'tests/cypress/fixtures',
	screenshotsFolder: 'tests/cypress/screenshots',
	video: false,
	videosFolder: 'tests/cypress/videos',
	videoUploadOnPasses: false,
	chromeWebSecurity: false,
	e2e: {
		setupNodeEvents(on, config) {
			return require('./tests/cypress/plugins/index.js')(on, config);
		},
		baseUrl: 'http://localhost:10003',
		specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: 'tests/cypress/support/index.js',
	},
});
