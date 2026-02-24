<?php
/**
 * Bootstrap file for wpunit tests.
 *
 * @package NewfoldLabs\WP\Module\HelpCenter
 */

$module_root = dirname( dirname( __DIR__ ) );

if ( ! defined( 'NFD_HELPCENTER_DIR' ) ) {
	define( 'NFD_HELPCENTER_DIR', $module_root );
}
if ( ! defined( 'NFD_HELPCENTER_BUILD_DIR' ) ) {
	define( 'NFD_HELPCENTER_BUILD_DIR', $module_root . '/build/' );
}

require_once $module_root . '/vendor/autoload.php';
require_once $module_root . '/bootstrap.php';
