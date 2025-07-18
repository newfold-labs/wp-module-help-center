/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { GetPluginId } from '../wp-module-support/pluginID.cy';
import {
	wpLogin,
} from '../wp-module-support/utils.cy';

const customCommandTimeout = 20000;
const pluginId = GetPluginId();

export const HCTrue = JSON.stringify({
	canAccessAI: true,
	hasAISiteGen: true,
	canAccessHelpCenter: true,
	canAccessGlobalCTB: true,
	hasEcomdash: true,
	hasYithExtended: true,
	isEcommerce: true,
	isJarvis: true,
});

describe(
	'Home Page- Help Center',
	{ testIsolation: true },
	() => {
		before(() => {
			wpLogin();
			cy.wait(5000);
			cy.visit('/wp-admin/options-permalink.php');

			// Select the "Post name" radio input
			cy.get('#permalink-input-post-name').check({ force: true });

			// Submit the form
			cy.get('form[name="form"]').submit();
			cy.wait(5000);
		});
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

		it('Verify HelpCenter search response.', function () {
			cy.viewport(1500, 1200);
			if (pluginId === 'hostgator') {
				this.skip();
			}
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
				.click()

			cy.get('.nfd-help-center')
				.should('exist')
				.and('be.visible')
				.find('#search-input-box')
				.should('exist')
				.type('How to install a plugin in WordPress{enter}')
			cy.get('.helpcenter-question-block')
				.findByText('"How to install a plugin in WordPress"').should('exist')

			cy.wait(5000);
			cy.get('.helpcenter-question-block')
				.next()
				.should('have.class', 'helpcenter-result-block').should('exist').and('be.visible')
		});

		it('Verify HelpCenter dislike screen.', function () {
			cy.viewport(1500, 1200);
			if (pluginId === 'hostgator') {
				this.skip();
			}
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
				.click()

			cy.get('.nfd-help-center')
				.should('exist')
				.and('be.visible')
				.find('#search-input-box')
				.should('exist')
				.type('How to install a plugin in WordPress{enter}')

			cy.wait(5000);
			cy.get('button.feedback-button.no').click();
			cy.wait(500);
			cy.get('.dislike-feedback').should('exist');
		});

		it('Verify HelpCenter footer and CTA button visible and clickable.', () => {
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
				.click();

			cy.get('#nfd-help-center').should('exist').and('be.visible');

			cy.get('.nfd-hc-modal__footer').should('be.visible');

			cy.get('.hc-banner-content__cta').should('exist').and('be.visible');

			cy.get('.hc-banner-content__cta--button')
				.should('exist')
				.and('be.visible')
				.and('have.attr', 'href')
				.and('not.be.empty');
		});

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

		it('Verify Tooltip functionality to retrive post information', () => {
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
				.click();
			cy.get('#help-center-tooltip')
				.should('have.css', 'display', 'none')
				.click({ force: true });
			cy.get('.helpcenter-question-block', { timeout: 10000 })
				.findByText('"i have 7 items in the cart that dont really exist how do i get rid of them"').should('exist')
		});
	}
);
