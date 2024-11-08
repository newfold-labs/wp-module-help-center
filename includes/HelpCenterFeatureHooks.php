<?php
namespace NewfoldLabs\WP\Module\HelpCenter;

use NewfoldLabs\WP\Module\Data\SiteCapabilities;
use NewfoldLabs\WP\Module\Features\Features;

/**
 * This class adds helpCenter feature hooks.
 **/
class HelpCenterFeatureHooks {

	/**
	 * Constructor.
	 */
	public function __construct() {
		// set constant
		if ( ! defined( 'USER_INTERACTION_SERVICE_BASE' ) ) {
			define( 'USER_INTERACTION_SERVICE_BASE', 'https://hiive.cloud/workers/ai-proxy/' );
		}

		if ( function_exists( 'add_action' ) ) {
			add_action( 'plugins_loaded', array( $this, 'hooks' ) );
		}
	}

	/**
	 * Add hooks.
	 */
	public function hooks() {
		// add filter so we don't show/load help during onboarding
		add_filter( 'newfold/features/filter/isEnabled:helpCenter', array( $this, 'filterValue' ) );
		add_filter( 'newfold/features/action/onDisable:helpCenter', array( $this, 'clearhelpCenter' ) );
	}

	/**
	 * Enqueue inline script as back up to hide the helpcenter UI on onboarding flow
	 */
	public function clearhelpCenter() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_clear_storage_script' ), 20 );
	}

	/**
	 * incline script to clear localStorage
	 */
	public function enqueue_clear_storage_script() {

		$clear_storage_js = <<<JS
			document.addEventListener("DOMContentLoaded", function() {
				const nfdHelpContainer = document.getElementById( 'nfd-help-center' );
				nfdHelpContainer.classList.toggle( 'help-container', false );
			});
		JS;

		// Add the inline script to `nfd-help-center` if it’s enqueued
		if ( wp_script_is( 'nfd-help-center', 'enqueued' ) ) {
			wp_add_inline_script( 'nfd-help-center', $clear_storage_js );
		} else {
			// Fallback: Add the inline script directly to `admin_enqueue_scripts`
			echo "<script>{$clear_storage_js}</script>";
		}
	}

	/**
	 * Feature filter based on capabilities.
	 *
	 * @param boolean $value the value
	 * @return boolean the filtered value
	 */
	public function filterValue( $value ) {
		$helpCenterFeature = Features::getInstance()->getFeature( 'helpCenter' );
		if ( $this->shouldDisable() ) {
			$value = false;
			if ( $helpCenterFeature ) {
				$helpCenterFeature->disable();
			}
		} elseif ( $helpCenterFeature ) {
				$helpCenterFeature->enable();
		}
		return $value;
	}

	/**
	 * Context condition for disabling feature.
	 *
	 * @return boolean whether the feature should be disabled
	 */
	public function shouldDisable() {
		// Do not load Help Center when in Onboarding (Onboarding has no admin bar to toggle this).
		$isOnboarding = isset( $_GET['page'] ) && 'nfd-onboarding' === sanitize_text_field( $_GET['page'] );
		if ( $isOnboarding ) {
			return true;
		}
		// Do not load if `canAccessHelpCenter` capability is not true
		$capabilities  = new SiteCapabilities();
		$hasCapability = $capabilities->get( 'canAccessHelpCenter' );
		if ( ! $hasCapability ) {
			return true;
		}
		return false;
	}
}
