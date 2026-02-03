<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

use NewfoldLabs\WP\Module\HelpCenter\Data\Brands;

/**
 * Data Brands wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\HelpCenter\Data\Brands
 */
class DataBrandsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Get_brands returns expected brand keys.
	 *
	 * @return void
	 */
	public function test_get_brands_returns_expected_keys() {
		$brands = Brands::get_brands();
		$this->assertIsArray( $brands );
		$this->assertArrayHasKey( 'bluehost', $brands );
		$this->assertArrayHasKey( 'hostgator-us', $brands );
		$this->assertArrayHasKey( 'hostgator-br', $brands );
		$this->assertArrayHasKey( 'brand', $brands['bluehost'] );
		$this->assertArrayHasKey( 'name', $brands['bluehost'] );
		$this->assertArrayHasKey( 'url', $brands['bluehost'] );
	}

	/**
	 * Get_resource_link_for_brand returns help URL for bluehost.
	 *
	 * @return void
	 */
	public function test_get_resource_link_for_brand_bluehost() {
		$url = Brands::get_resource_link_for_brand( 'bluehost' );
		$this->assertNotEmpty( $url );
		$this->assertStringContainsString( 'bluehost', $url );
		$this->assertStringContainsString( 'help', $url );
	}

	/**
	 * Get_resource_link_for_brand returns empty for unknown brand.
	 *
	 * @return void
	 */
	public function test_get_resource_link_for_brand_unknown_returns_empty() {
		$url = Brands::get_resource_link_for_brand( 'unknown-brand' );
		$this->assertSame( '', $url );
	}
}
