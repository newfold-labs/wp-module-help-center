<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

/**
 * HelpCenter excluded-screen wpunit tests.
 *
 * Covers HelpCenter::is_excluded_screen() and the early-return guards in
 * HelpCenter::newfold_help_center() and HelpCenter::assets() that were added
 * to keep the help center off the block editor and site editor (PRESS0-4504).
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\HelpCenter\HelpCenter
 */
class HelpCenterExcludedScreenWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Reset the current admin screen so each test starts clean.
	 *
	 * @return void
	 */
	public function tearDown(): void {
		// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- Reset admin screen fixture between tests.
		unset( $GLOBALS['current_screen'] );
		parent::tearDown();
	}

	/**
	 * Build a HelpCenter without invoking the constructor.
	 *
	 * The constructor expects a Container and registers actions that the
	 * methods under test never reach, so bypassing it keeps the test focused
	 * on the excluded-screen guard.
	 *
	 * @return HelpCenter
	 */
	private function make_help_center() {
		$reflection = new \ReflectionClass( HelpCenter::class );
		return $reflection->newInstanceWithoutConstructor();
	}

	/**
	 * Invoke the private is_excluded_screen() method.
	 *
	 * @param HelpCenter $instance HelpCenter instance.
	 * @return bool
	 */
	private function invoke_is_excluded_screen( HelpCenter $instance ) {
		$method = new \ReflectionMethod( HelpCenter::class, 'is_excluded_screen' );
		$method->setAccessible( true );
		return $method->invoke( $instance );
	}

	/**
	 * Returns false when no current screen is set.
	 *
	 * @return void
	 */
	public function test_is_excluded_screen_returns_false_when_no_screen() {
		// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- Simulate no admin screen for this test.
		unset( $GLOBALS['current_screen'] );
		$this->assertFalse( $this->invoke_is_excluded_screen( $this->make_help_center() ) );
	}

	/**
	 * Returns false on a regular admin screen.
	 *
	 * @return void
	 */
	public function test_is_excluded_screen_returns_false_on_dashboard() {
		set_current_screen( 'dashboard' );
		$this->assertFalse( $this->invoke_is_excluded_screen( $this->make_help_center() ) );
	}

	/**
	 * Returns true when the current screen is the block editor.
	 *
	 * @return void
	 */
	public function test_is_excluded_screen_returns_true_for_block_editor() {
		set_current_screen( 'edit-post' );
		$screen = get_current_screen();
		// Older WP_Screen builds lack the setter; the public property is the stable surface.
		if ( method_exists( $screen, 'set_is_block_editor' ) ) {
			$screen->set_is_block_editor( true );
		} else {
			$screen->is_block_editor = true;
		}
		$this->assertTrue( $this->invoke_is_excluded_screen( $this->make_help_center() ) );
	}

	/**
	 * Returns true when the current screen is the site editor.
	 *
	 * In WP 6.x the site editor reports base and id as 'site-editor'; the
	 * guard checks both fields so we force them explicitly to make the
	 * assertion independent of how WP_Screen::get() resolves the hook.
	 *
	 * @return void
	 */
	public function test_is_excluded_screen_returns_true_for_site_editor() {
		set_current_screen( 'site-editor' );
		$screen       = get_current_screen();
		$screen->base = 'site-editor';
		$screen->id   = 'site-editor';
		$this->assertTrue( $this->invoke_is_excluded_screen( $this->make_help_center() ) );
	}

	/**
	 * Verifies that newfold_help_center early-returns and does not add the
	 * admin-bar node when the current screen is excluded.
	 *
	 * @return void
	 */
	public function test_newfold_help_center_skips_when_screen_is_excluded() {
		// WP_Admin_Bar is only loaded on admin requests; pull it in for the test.
		require_once ABSPATH . WPINC . '/class-wp-admin-bar.php';

		set_current_screen( 'site-editor' );
		$screen       = get_current_screen();
		$screen->base = 'site-editor';
		$screen->id   = 'site-editor';

		$admin_bar = new \WP_Admin_Bar();
		$this->make_help_center()->newfold_help_center( $admin_bar );

		$this->assertNull( $admin_bar->get_node( 'help-center' ) );
	}

	/**
	 * Verifies that assets() early-returns when the current screen is excluded.
	 *
	 * The instance is built without a constructor so the container is
	 * uninitialized; reaching the body of assets() would fatal. A clean
	 * return is itself the assertion that the guard fired.
	 *
	 * @return void
	 */
	public function test_assets_skips_when_screen_is_excluded() {
		set_current_screen( 'site-editor' );
		$screen       = get_current_screen();
		$screen->base = 'site-editor';
		$screen->id   = 'site-editor';

		$this->expectNotToPerformAssertions();
		$this->make_help_center()->assets();
	}
}
