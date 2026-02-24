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
	 * Get_brand_data returns expected brand keys.
	 *
	 * @return void
	 */
	public function test_get_brand_data_returns_expected_keys() {
		$brands = Brands::get_brand_data();
		$this->assertIsArray( $brands );
		$this->assertArrayHasKey( 'bluehost', $brands );
		$this->assertArrayHasKey( 'hostgator-us', $brands );
		$this->assertArrayHasKey( 'brand', $brands['bluehost'] );
		$this->assertArrayHasKey( 'name', $brands['bluehost'] );
		$this->assertArrayHasKey( 'url', $brands['bluehost'] );
		$this->assertArrayHasKey( 'helpURL', $brands['bluehost'] );
	}

	/**
	 * Get_brand_data bluehost has full config structure.
	 *
	 * @return void
	 */
	public function test_get_brand_data_bluehost_has_full_config() {
		$data = Brands::get_brand_data();
		$bh   = $data['bluehost'];

		$this->assertArrayHasKey( 'contactUrl', $bh );
		$this->assertArrayHasKey( 'phone', $bh );
		$this->assertArrayHasKey( 'phoneDisplay', $bh );
		$this->assertArrayHasKey( 'accountName', $bh );
		$this->assertArrayHasKey( 'hasPhone', $bh );
		$this->assertArrayHasKey( 'showProDesignBanner', $bh );
		$this->assertArrayHasKey( 'kbClickDomains', $bh );
		$this->assertTrue( $bh['hasPhone'] );
		$this->assertTrue( $bh['showProDesignBanner'] );
		$this->assertIsArray( $bh['kbClickDomains'] );
		$this->assertContains( 'bhmultisite.com', $bh['kbClickDomains'] );
	}

	/**
	 * Get_brand_data hostgator_us has expected config.
	 *
	 * @return void
	 */
	public function test_get_brand_data_hostgator_us_has_expected_config() {
		$data = Brands::get_brand_data();
		$hg   = $data['hostgator-us'];

		$this->assertSame( 'hostgator', $hg['brand'] );
		$this->assertTrue( $hg['hasPhone'] );
		$this->assertFalse( $hg['showProDesignBanner'] );
		$this->assertEmpty( $hg['kbClickDomains'] );
		$this->assertStringContainsString( 'hostgator', $hg['helpURL'] );
		$this->assertStringContainsString( 'help', $hg['helpURL'] );
	}

	/**
	 * Get_data_for_brand returns exact match for bluehost.
	 *
	 * @return void
	 */
	public function test_get_data_for_brand_bluehost_exact_match() {
		$data = Brands::get_data_for_brand( 'bluehost' );
		$this->assertSame( 'bluehost', $data['brand'] );
		$this->assertStringContainsString( 'bluehost', $data['helpURL'] );
	}

	/**
	 * Get_data_for_brand returns exact match for hostgator_us.
	 *
	 * @return void
	 */
	public function test_get_data_for_brand_hostgator_us_exact_match() {
		$data = Brands::get_data_for_brand( 'hostgator-us' );
		$this->assertSame( 'hostgator', $data['brand'] );
		$this->assertStringContainsString( 'hostgator', $data['helpURL'] );
	}

	/**
	 * Get_data_for_brand falls back to hostgator_us for undefined hostgator region.
	 *
	 * @return void
	 */
	public function test_get_data_for_brand_hostgator_undefined_region_falls_back_to_us() {
		$data = Brands::get_data_for_brand( 'hostgator-xy' );
		$this->assertSame( 'hostgator', $data['brand'] );
		$this->assertStringContainsString( 'hostgator.com', $data['helpURL'] );
	}

	/**
	 * Get_data_for_brand falls back to bluehost for unknown brand.
	 *
	 * @return void
	 */
	public function test_get_data_for_brand_unknown_brand_falls_back_to_bluehost() {
		$data = Brands::get_data_for_brand( 'wordpress' );
		$this->assertSame( 'bluehost', $data['brand'] );
		$this->assertStringContainsString( 'bluehost', $data['helpURL'] );
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
	 * Get_resource_link_for_brand returns help URL for hostgator_us.
	 *
	 * @return void
	 */
	public function test_get_resource_link_for_brand_hostgator_us() {
		$url = Brands::get_resource_link_for_brand( 'hostgator-us' );
		$this->assertNotEmpty( $url );
		$this->assertStringContainsString( 'hostgator', $url );
		$this->assertStringContainsString( 'help', $url );
	}

	/**
	 * Get_resource_link_for_brand returns hostgator_us URL for undefined hostgator region.
	 *
	 * @return void
	 */
	public function test_get_resource_link_for_brand_hostgator_undefined_region_returns_us_url() {
		$url = Brands::get_resource_link_for_brand( 'hostgator-xy' );
		$this->assertNotEmpty( $url );
		$this->assertStringContainsString( 'hostgator', $url );
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

	/**
	 * Get_resource_link_for_brand returns empty for empty string.
	 *
	 * @return void
	 */
	public function test_get_resource_link_for_brand_empty_string_returns_empty() {
		$url = Brands::get_resource_link_for_brand( '' );
		$this->assertSame( '', $url );
	}

	/**
	 * Get_data_for_brand empty string falls back to bluehost.
	 *
	 * @return void
	 */
	public function test_get_data_for_brand_empty_string_falls_back_to_bluehost() {
		$data = Brands::get_data_for_brand( '' );
		$this->assertSame( 'bluehost', $data['brand'] );
		$this->assertStringContainsString( 'bluehost', $data['helpURL'] );
	}

	/**
	 * Get_data_for_brand bare hostgator (no region) returns hostgator-us.
	 *
	 * @return void
	 */
	public function test_get_data_for_brand_bare_hostgator_returns_hostgator_us() {
		$data = Brands::get_data_for_brand( 'hostgator' );
		$this->assertSame( 'hostgator', $data['brand'] );
		$this->assertStringContainsString( 'hostgator.com', $data['helpURL'] );
		$this->assertTrue( $data['hasPhone'] );
	}

	/**
	 * Get_resource_link_for_brand bare hostgator returns hostgator-us URL.
	 *
	 * @return void
	 */
	public function test_get_resource_link_for_brand_bare_hostgator_returns_us_url() {
		$url = Brands::get_resource_link_for_brand( 'hostgator' );
		$this->assertNotEmpty( $url );
		$this->assertStringContainsString( 'hostgator', $url );
		$this->assertStringContainsString( 'help', $url );
	}

	/**
	 * Get_data_for_brand returns hasPhone for all resolvable brands.
	 *
	 * @return void
	 */
	public function test_get_data_for_brand_returns_has_phone_key() {
		$brands_to_check = array( 'bluehost', 'hostgator-us', 'hostgator-xy', 'hostgator', 'wordpress' );
		foreach ( $brands_to_check as $brand ) {
			$data = Brands::get_data_for_brand( $brand );
			$this->assertArrayHasKey( 'hasPhone', $data, "Brand {$brand} should have hasPhone key" );
			$this->assertIsBool( $data['hasPhone'], "Brand {$brand} hasPhone should be boolean" );
		}
	}

	/**
	 * Set_current_brand defines constant when not already defined.
	 *
	 * Note: set_current_brand defines NFD_HELPCENTER_PLUGIN_BRAND once; subsequent
	 * calls do nothing. This test verifies the method runs without error when given
	 * a valid container. Full behavior is covered by bootstrap/integration tests.
	 *
	 * @return void
	 */
	public function test_set_current_brand_accepts_container_and_defines_constant() {
		$plugin         = new \stdClass();
		$plugin->brand  = 'bluehost';
		$plugin->region = '';

		$container = new class( $plugin ) {
			private $plugin;

			public function __construct( $plugin ) {
				$this->plugin = $plugin;
			}

			public function plugin() {
				return $this->plugin;
			}
		};

		Brands::set_current_brand( $container );

		$this->assertTrue( defined( 'NFD_HELPCENTER_PLUGIN_BRAND' ) );
		$this->assertNotEmpty( NFD_HELPCENTER_PLUGIN_BRAND );
	}
}
