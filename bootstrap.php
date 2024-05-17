<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

use NewfoldLabs\WP\Module\HelpCenter\HelpCenter;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\HelpCenter\Data\Brands;

require_once __DIR__ . "/includes/HelpCenterFeature.php";
require_once __DIR__ . "/includes/HelpCenterFeatureHooks.php";

new HelpCenterFeatureHooks();