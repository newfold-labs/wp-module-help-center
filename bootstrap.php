<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

use NewfoldLabs\WP\Module\HelpCenter\HelpCenter;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\HelpCenter\Data\Brands;

if ( function_exists( 'add_filter' ) ) {
	add_filter(
		'newfold/features/filter/register',
		function ( $features ) {
			return array_merge( $features, array( HelpCenterFeature::class ) );
		}
	);
}

new HelpCenterFeatureHooks();
