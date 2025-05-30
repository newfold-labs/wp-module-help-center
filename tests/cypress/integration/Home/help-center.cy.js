/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	wpLogin,
} from '../wp-module-support/utils.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();

export const HCTrue = JSON.stringify({
	"canAccessAI": true,
	"hasAISiteGen": true,
	"canAccessHelpCenter": true,
	"canAccessGlobalCTB": true,
	"hasEcomdash": true,
	"hasYithExtended": true,
	"isEcommerce": true,
	"isJarvis": true,
});

describe(
	'Home Page- Help Center',
	{ testIsolation: true },
	() => {

		beforeEach(() => {
			wpLogin();
			cy.exec(
				`npx wp-env run cli wp option update _transient_nfd_site_capabilities '${HCTrue}' --format=json`,
				{ timeout: customCommandTimeout }
			);
			cy.reload();
			cy.visit("/wp-admin/index.php");
		});

		it('Verify HelpCenter icon visible.', () => {
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
		});

		it('Verify HelpCenter layout visible onclick.', () => {
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
				.click()

			cy.get('#nfd-help-center').should('exist').and('be.visible')

		});

		// it('Verify HelpCenter search response.', function() {
		// 	cy.viewport(1500, 1200);
		// 	if ( pluginId === 'hostgator' ) {
		// 		this.skip();
		// 	}
		// 	cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
		// 		timeout: customCommandTimeout,
		// 	})
		// 		.find('svg')
		// 		.should('exist')
		// 		.and('be.visible')
		// 		.click()

		// 	cy.get('.nfd-help-center')
		// 		.should('exist')
		// 		.and('be.visible')
		// 		.find('#search-input-box')
		// 		.should('exist')
		// 		.type('How to install a plugin in WordPress{enter}')
		// 	cy.get('.helpcenter-question-block')
		// 		.findByText('How to install a plugin in WordPress').should('exist')

		// 	cy.wait(5000);
		// 	cy.get('.helpcenter-question-block')
		// 		.next()
		// 		.should('have.class', 'helpcenter-result-block').should('exist').and('be.visible')
		// });

		//TODO : Need to fix Accessibility in Help Center
		// 
		// it('Accessibility Test for Help Center.', () => {
		// 	cy.injectAxe();
		// 	cy.configureAxe({
		// 		rules: [
		// 			{
		// 				id: 'color-contrast',
		// 				enabled: false,
		// 			},
		// 			{
		// 				id: 'link-in-text-block',
		// 				enabled: false,
		// 			},
		// 		],
		// 	});
		// 	cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
		// 		timeout: customCommandTimeout,
		// 	})
		// 		.find('svg')
		// 		.should('exist')
		// 		.and('be.visible')
		// 		.click()

		// 	cy.get('.nfd-help-center')
		// 		.should('be.visible')
		// 		.checkA11y(undefined, undefined, (violations) => {
		// 			cy.log(violations);
		// 		});

		// });

		it('Verify HelpCenter closed onclick.', () => {
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
				.click()

			cy.get('#nfd-help-center').should('exist').and('be.visible')
			cy.get('.nfd-hc-modal__header__close-button')
				.should('be.visible')
				.click()

			cy.get('#nfd-help-center').should('not.be.visible')

		});

	}
);
