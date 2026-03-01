<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

/**
 * Module loading wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\HelpCenter\HelpCenterFeature
 */
class ModuleLoadingWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Verify core module classes exist.
	 *
	 * @return void
	 */
	public function test_module_classes_load() {
		$this->assertTrue( class_exists( HelpCenterFeature::class ) );
		$this->assertTrue( class_exists( HelpCenterFeatureHooks::class ) );
		$this->assertTrue( class_exists( HelpCenter::class ) );
		$this->assertTrue( class_exists( CapabilityController::class ) );
		$this->assertTrue( class_exists( Data\Brands::class ) );
	}

	/**
	 * Verify WordPress factory is available.
	 *
	 * @return void
	 */
	public function test_wordpress_factory_available() {
		$this->assertTrue( function_exists( 'get_option' ) );
		$this->assertNotEmpty( get_option( 'blogname' ) );
	}
}
