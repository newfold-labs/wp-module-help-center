<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

/**
 * CapabilityController wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\HelpCenter\CapabilityController
 */
class CapabilityControllerWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Controller has expected namespace and rest_base.
	 *
	 * @return void
	 */
	public function test_controller_namespace_and_rest_base() {
		$controller = new CapabilityController();
		$reflection  = new \ReflectionClass( $controller );
		$namespace  = $reflection->getProperty( 'namespace' );
		$namespace->setAccessible( true );
		$rest_base = $reflection->getProperty( 'rest_base' );
		$rest_base->setAccessible( true );
		$this->assertSame( 'nfd-help-center/v1', $namespace->getValue( $controller ) );
		$this->assertSame( 'capability', $rest_base->getValue( $controller ) );
	}

	/**
	 * Check_permission returns WP_Error when user cannot read.
	 *
	 * @return void
	 */
	public function test_check_permission_returns_error_when_not_authenticated() {
		$controller = new CapabilityController();
		// Ensure no user is logged in.
		wp_set_current_user( 0 );
		$result = $controller->check_permission();
		$this->assertInstanceOf( \WP_Error::class, $result );
		$this->assertSame( 'rest_forbidden', $result->get_error_code() );
	}

	/**
	 * Check_permission returns true when user can read.
	 *
	 * @return void
	 */
	public function test_check_permission_returns_true_when_user_can_read() {
		$user_id = static::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$controller = new CapabilityController();
		$result     = $controller->check_permission();
		$this->assertTrue( $result );
	}
}
