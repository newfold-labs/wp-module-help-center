<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

/**
 * HelpCenter::get_js_environment() wpunit tests.
 *
 * Verifies the structure and contract of the environment flags emitted to the JS bundle.
 * These flags drive welcome-screen suggestion gating (e.g. hiding "Add a product" when
 * WooCommerce is absent), so the contract here is what every client predicate relies on.
 *
 * The "true" path for hasWooCommerce isn't asserted directly because defining a
 * `WooCommerce` class via class_alias leaks across tests in the shared wpunit process.
 * Instead we assert the relationship — the flag tracks class_exists() — which is the
 * invariant we actually care about and is robust regardless of which classes are loaded.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\HelpCenter\HelpCenter
 */
class HelpCenterEnvironmentWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * The method returns an array containing the documented flag keys.
	 *
	 * @return void
	 */
	public function test_returns_array_with_known_flags() {
		$env = HelpCenter::get_js_environment();

		$this->assertIsArray( $env );
		$this->assertArrayHasKey( 'hasWooCommerce', $env );
	}

	/**
	 * Every flag value is a real boolean, not a truthy/falsy scalar. The JS side spreads
	 * this object over typed defaults, so non-boolean values would silently corrupt the
	 * env shape.
	 *
	 * @return void
	 */
	public function test_flag_values_are_booleans() {
		$env = HelpCenter::get_js_environment();

		foreach ( $env as $key => $value ) {
			$this->assertIsBool( $value, "Flag '{$key}' must be a boolean." );
		}
	}

	/**
	 * Verifies hasWooCommerce mirrors class_exists( 'WooCommerce' ). This is the
	 * load-bearing contract; the JS welcome-screen gating assumes exactly this relationship.
	 *
	 * @return void
	 */
	public function test_has_woocommerce_mirrors_class_exists() {
		$env = HelpCenter::get_js_environment();

		$this->assertSame( class_exists( 'WooCommerce' ), $env['hasWooCommerce'] );
	}

	/**
	 * In the wpunit environment WooCommerce is not installed, so the flag must be false.
	 * Skips defensively if a future test setup pre-loads WooCommerce, since the absent
	 * path is what we want to lock in here.
	 *
	 * @return void
	 */
	public function test_has_woocommerce_false_without_class() {
		if ( class_exists( 'WooCommerce' ) ) {
			$this->markTestSkipped( 'WooCommerce class is present in this test run; absent-path assertion skipped.' );
		}

		$env = HelpCenter::get_js_environment();

		$this->assertFalse( $env['hasWooCommerce'] );
	}
}
