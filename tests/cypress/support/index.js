
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-axe';
import './commands';

beforeEach(() => {
	cy.session('wordpress-session', () => {
			cy.visit('/'); // Replace with your application's login or initial URL
			// Add login steps here if necessary
			cy.getCookies().then((cookies) => {
					cookies.forEach((cookie) => {
							if (/wp|wordpress/.test(cookie.name)) {
									cy.setCookie(cookie.name, cookie.value, {
											domain: cookie.domain,
											path: cookie.path,
											secure: cookie.secure,
											httpOnly: cookie.httpOnly,
											sameSite: cookie.sameSite,
									});
							}
					});
			});
	});
});


before(() => {
	cy.login(Cypress.env('wpUsername'), Cypress.env('wpPassword'));
});
