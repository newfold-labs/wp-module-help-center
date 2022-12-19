<?php

use NewfoldLabs\WP\Module\HelpCenter\HelpCenter;
use NewfoldLabs\WP\ModuleLoader\Container;
use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {

			register(
				[
					'name'     => 'help-center',
					'label'    => __( 'Help Center', 'newfold-help-center-module' ),
					'callback' => function ( Container $container ) {
						define( 'NFD_HELPCENTER_BUILD_DIR', __DIR__ . '/build/' );
						define( 'NFD_HELPCENTER_PLUGIN_URL', $container->plugin()->url );
						new HelpCenter( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				]
			);

		}
	);

}
