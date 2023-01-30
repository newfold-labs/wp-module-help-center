<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

use NewfoldLabs\WP\ModuleLoader\Container;

class HelpCenter {

	/**
	 * Dependency injection container.
	 *
	 * @var Container
	 */
	protected $container;

	/**
	 * Constructor.
	 *
	 * @param Container $container
	 */
	public function __construct( Container $container ) {

		$this->container = $container;
		add_action( 'rest_api_init', array( $this, 'register_settings' ) );
		add_action( 'init' , array( $this, 'register_assets') );
		// Module functionality goes here
	}

	public function register_settings() {
		\register_setting(
			'general',
			'nfd-help-center-enabled',
			array(
				'show_in_rest' => true,
				'type'         => 'boolean',
				'default' 	   => true,
				'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
			)
		);
	}

	/**
	 * Load WP dependencies into the page.
	 */
	public function register_assets() {
		$asset_file = NFD_HELPCENTER_BUILD_DIR . 'index.asset.php';
		if ( file_exists($asset_file) ) {
			$asset = require_once $asset_file;
			\wp_enqueue_script(
				'nfd-helpcenter-dependency',
				NFD_HELPCENTER_PLUGIN_URL . 'vendor/newfold-labs/wp-module-help-center/build/index.js',
				array_merge( $asset['dependencies'], array() ),
				$asset_file,
				true
			);
			\wp_enqueue_style(
				'stylesheet',
				NFD_HELPCENTER_PLUGIN_URL . 'vendor/newfold-labs/wp-module-help-center/build/index.css',
				null, '1', 'screen'
			);
		}
	}
}
