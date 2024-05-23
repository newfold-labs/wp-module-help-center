<?php
namespace NewfoldLabs\WP\Module\HelpCenter;

use function NewfoldLabs\WP\Module\Features\disable as disableFeature;
use NewfoldLabs\WP\Module\Data\SiteCapabilities;

/**
 * This class adds helpCenter feature hooks.
 **/
class HelpCenterFeatureHooks {

	/**
	 * Constructor.
	 */
	public function __construct() {
		if ( function_exists( 'add_action' ) ) {
			add_action( 'plugins_loaded', array( $this, 'hooks' ) );
		}
	}

	/**
	 * Add hooks.
	 */
	public function hooks() {
		// set constant
		if ( ! defined( 'USER_INTERACTION_SERVICE_BASE' ) ) {
			define( 'USER_INTERACTION_SERVICE_BASE', 'https://hiive.cloud/workers/ai-proxy/' );
		}
		// add filter so we don't show/load help during onboarding
		add_filter( 'newfold/features/filter/isEnabled:helpCenter', array( $this, 'filterValue' ) );
	}

	/**
	 * Feature filter based on context.
	 *
	 * @param boolean $value the value
	 * @return boolean the filtered value
	 */
	public function filterValue( $value ) {
		if ( $this->shouldDisable() ) {
			$value = false;
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
		if ( $isOnboarding ){
			return true;
		}
		// Do not load if `canAccessHelpCenter` capability is not set
        $capability   = new SiteCapabilities();
		$hasCapability = $capability->get( 'canAccessHelpCenter' );
		if ( ! $hasCapability ) {
			return true;
		}
		return false;
	}
}
