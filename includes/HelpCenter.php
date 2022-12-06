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

		// Module functionality goes here

	}

}
