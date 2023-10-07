<?php

use NewfoldLabs\WP\Module\HelpCenter\HelpCenter;
use NewfoldLabs\WP\ModuleLoader\Container;
use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {
			if ( ! defined( 'USER_INTERACTION_SERVICE_BASE' ) ) {
				define( 'USER_INTERACTION_SERVICE_BASE', 'https://hiive.cloud/workers/ai-proxy/' );
			}

				register(
					array(
						'name'     => 'help-center',
						'label'    => __( 'Help Center', 'wp-module-help-center' ),
						'callback' => function ( Container $container ) {
							define( 'NFD_HELPCENTER_PLUGIN_DIRNAME', dirname( $container->plugin()->basename ) );
							define( 'NFD_HELPCENTER_DIR', __DIR__ );
							define( 'NFD_HELPCENTER_BUILD_DIR', __DIR__ . '/build/' );
							define( 'NFD_HELPCENTER_PLUGIN_URL', $container->plugin()->url );
							/*
							 Do not load Help Center when in Onboarding (Onboarding has no admin bar to toggle this).
							[TODO] Find a cleaner way to handle this.
							*/
							if ( isset( $_GET['page'] ) && 'nfd-onboarding' === sanitize_text_field( $_GET['page'] ) ) {
								return;
							}

							new HelpCenter( $container );
						},
						'isActive' => true,
						'isHidden' => true,
					)
				);

		}
	);

}
