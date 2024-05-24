<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

if ( function_exists( 'add_filter' ) ) {
	add_filter(
		'newfold/features/filter/register',
		function ( $features ) {
			return array_merge( $features, array( HelpCenterFeature::class ) );
		}
	);
}

new HelpCenterFeatureHooks();
