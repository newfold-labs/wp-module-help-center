<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

use NewfoldLabs\WP\ModuleLoader\Container;

/**
 * The class to initialize and load the module.
 */
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
        add_action( 'rest_api_init', array( $this, 'initialize_rest' ) );
        add_action( 'admin_init', array( $this, 'register_assets') );
        add_action( 'admin_bar_menu', array( $this, 'newfold_help_center' ), 11);
    }

    public function initialize_rest() {
        $controllers = array(
			'NewfoldLabs\\WP\\Module\\HelpCenter\\UserInteractionController',
            'NewfoldLabs\\WP\\Module\\HelpCenter\\CapabilityController',
		);

		foreach ( $controllers as $controller ) {
			$instance = new $controller();
			$instance->register_routes();
		}
    }

    public function newfold_help_center( \WP_Admin_Bar $admin_bar ) {
        if ( current_user_can( 'manage_options' ) ) {
            $help_icon           = 
			'<svg style="vertical-align: middle; cursor: pointer" width="22" height="22" viewBox="0 1 36 37" fill="#000" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M18 0.901855C8.05888 0.901855 0 8.96073 0 18.9019C0 28.843 8.05888 36.9019 18 36.9019H33.3659C34.8207 36.9019 36 35.7225 36 34.2677V18.9019C36 8.96073 27.9411 0.901855 18 0.901855ZM17.087 18.7795C16.751 19.3675 16.583 20.0647 16.583 20.8711V21.7027H19.9094V21.2995C19.9094 20.7115 20.0102 20.2243 20.2118 19.8379C20.4302 19.4515 20.825 18.9895 21.3962 18.4519C22.1186 17.7631 22.6646 17.1079 23.0342 16.4863C23.4038 15.8647 23.5886 15.1171 23.5886 14.2435C23.5886 13.3531 23.3534 12.5467 22.883 11.8243C22.4294 11.0851 21.791 10.5055 20.9678 10.0855C20.1446 9.66548 19.2038 9.45548 18.1454 9.45548C16.7342 9.45548 15.5582 9.85028 14.6174 10.6399C13.6934 11.4127 13.0718 12.3367 12.7526 13.4119L15.6506 14.6215C15.8354 14.0335 16.1378 13.5463 16.5578 13.1599C16.9946 12.7567 17.549 12.5551 18.221 12.5551C18.8594 12.5551 19.3718 12.7399 19.7582 13.1095C20.1446 13.4623 20.3378 13.8991 20.3378 14.4199C20.3378 14.8567 20.2202 15.2431 19.985 15.5791C19.7666 15.9151 19.4054 16.3099 18.9014 16.7635C18.0446 17.5195 17.4398 18.1915 17.087 18.7795ZM16.6586 27.4231C17.0954 27.8431 17.6162 28.0531 18.221 28.0531C18.8258 28.0531 19.3382 27.8431 19.7582 27.4231C20.1782 26.9863 20.3882 26.4655 20.3882 25.8607C20.3882 25.2559 20.1782 24.7435 19.7582 24.3235C19.3382 23.9035 18.8258 23.6935 18.221 23.6935C17.6162 23.6935 17.0954 23.9035 16.6586 24.3235C16.2386 24.7435 16.0286 25.2559 16.0286 25.8607C16.0286 26.4655 16.2386 26.9863 16.6586 27.4231Z"
                fill="#fff" />
            </svg>';
            $help_center_menu = array(
                'id'     => 'help-center',
                'parent' => 'top-secondary',
                'title'  => $help_icon,
                'href'   => '',
                'meta'   => array(
                    'title' => esc_attr__( 'Help', 'wp-module-help' ),
                    'onclick' => 'newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp()',
                ),
            );
            $help_enabled = $this->container->get('capabilities')->get( 'canAccessHelpCenter' );
            if ( $help_enabled ) {
                $admin_bar->add_menu( $help_center_menu );
                $menu_name = $this->container->plugin()->id . '-help-center';
                $admin_bar->remove_menu( $menu_name );
            }
        }
    }

    /**
     * Load WP dependencies into the page.
     */
    public function register_assets() {
        $asset_file = NFD_HELPCENTER_BUILD_DIR . 'index.asset.php';
        $help_enabled = $this->container->get('capabilities')->get( 'canAccessHelpCenter' );
        if ( file_exists($asset_file) && $help_enabled ) {
            $asset = require_once $asset_file;
            \wp_enqueue_script(
                'nfd-helpcenter-dependency',
                NFD_HELPCENTER_PLUGIN_URL . 'vendor/newfold-labs/wp-module-help-center/build/index.js',
                array_merge( $asset['dependencies'], array() ),
                $asset_file,
                true
            );
            \wp_enqueue_style(
                'stylesheet',
                NFD_HELPCENTER_PLUGIN_URL . 'vendor/newfold-labs/wp-module-help-center/build/index.css',
                null, '1', 'screen'
            );

            \wp_add_inline_script(
                'nfd-helpcenter-dependency',
                'var nfdHelpCenter =' . wp_json_encode( array( 'restUrl' => \get_home_url() . '/index.php?rest_route=', ) ) . ';',
                'before'
            );
        }
    }
}
