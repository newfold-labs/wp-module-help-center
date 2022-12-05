<?php

namespace NewfoldLabs\WP\Module\WpModuleHelpCenter;

use NewfoldLabs\WP\ModuleLoader\Container;

class WpModuleHelpCenter {

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

		// Module functionality goes here

	}

}
