/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import {
	wpLogin,
} from '../wp-module-support/utils.cy';

const customCommandTimeout = 20000;

describe(
	'Home Page- Help Center',
	{ testIsolation: true },
	() => {
		beforeEach(() => {
			wpLogin();
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

			cy.get('.nfd-help-center').should('exist').and('be.visible')

		});

		it('Verify HelpCenter search response.', () => {
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
				.findByText('How to install a plugin in WordPress').should('exist')

			cy.wait(1000);
			cy.get('.helpcenter-question-block')
				.next()
				.should('have.class', 'helpcenter-result-block').should('exist').and('be.visible')
		});

		it('Accessibility Test for Help Center.', () => {
			cy.injectAxe();
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
				.click()

			cy.get('.nfd-help-center')
				.should('be.visible')
				.checkA11y(undefined, undefined, (violations) => {
					cy.log(violations);
				});

		});

		it('Verify HelpCenter closed onclick.', () => {
			cy.get('#wp-admin-bar-help-center .ab-item.ab-empty-item', {
				timeout: customCommandTimeout,
			})
				.find('svg')
				.should('exist')
				.and('be.visible')
				.click()

			cy.get('.nfd-help-center').should('exist').and('be.visible')
			cy.get('.nfd-hc-modal__header__close-button__icon-button')
				.should('be.visible')
				.click()

			cy.get('.nfd-help-center').should('not.exist')

		});

	}
);
