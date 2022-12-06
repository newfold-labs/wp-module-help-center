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
						new HelpCenter( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				]
			);

		}
	);

}
