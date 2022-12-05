<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {

			register(
				[
					'name'     => 'wp-module-help-center',
					'label'    => __( 'wp-module-help-center', 'newfold-wp-module-help-center-module' ),
					'callback' => function ( Container $container ) {
						new WpModuleHelpCenter( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				]
			);

		}
	);

}
