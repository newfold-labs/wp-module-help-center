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
        add_action( 'rest_api_init', array( $this, 'register_settings' ) );
        add_action( 'init' , array( $this, 'register_assets') );
        add_action( 'admin_bar_menu', array( $this, 'newfold_help_center' ), 11);
    }

    public function register_settings() {
        \register_setting(
            'general',
            'nfd_help_center_enabled',
            array(
                'show_in_rest' => true,
                'type'         => 'boolean',
                'default'      => false,
                'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
            )
        );
    }

    public function newfold_help_center( \WP_Admin_Bar $admin_bar ) {
        if ( current_user_can( 'manage_options' ) ) {
            $help_icon           = 
			 '<svg style="vertical-align:middle" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
			 <rect width="26" height="26" rx="13" fill="white"/>
			 <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0003 2.1665C7.01708 2.1665 2.16699 7.01659 2.16699 12.9998C2.16699 18.9831 7.01708 23.8332 13.0003 23.8332C18.9836 23.8332 23.8337 18.9831 23.8337 12.9998C23.8337 7.01659 18.9836 2.1665 13.0003 2.1665ZM11.917 19.4998V17.3332H14.0837V19.4998H11.917ZM14.0837 16.2498V15.0138C15.0122 14.7757 15.8352 14.2359 16.4235 13.4792C17.0118 12.7225 17.332 11.7917 17.3337 10.8332C17.3337 9.6839 16.8771 8.5817 16.0645 7.76904C15.2518 6.95638 14.1496 6.49984 13.0003 6.49984C11.8511 6.49984 10.7489 6.95638 9.93619 7.76904C9.12354 8.5817 8.66699 9.6839 8.66699 10.8332H10.8337C10.8337 9.63825 11.8054 8.6665 13.0003 8.6665C14.1952 8.6665 15.167 9.63825 15.167 10.8332C15.167 12.0281 14.1952 12.9998 13.0003 12.9998C12.713 12.9998 12.4375 13.114 12.2343 13.3171C12.0311 13.5203 11.917 13.7959 11.917 14.0832V16.2498H14.0837Z" fill="#196BDE"/>
			 </svg>';
            $help_center_menu = array(
                'id'     => 'help-center',
                'parent' => 'top-secondary',
                'title'  => $help_icon,
                'href'   => '',
                'meta'   => array(
                    'title' => esc_attr__( 'Help', 'wp-module-ecommerce' ),
                    'onclick' => get_option( 'nfd_help_center_enabled') === '1' ? 'newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp()' : 'newfoldEmbeddedHelp.toggleNFDUnlaunchedEmbeddedHelp()',
                ),
            );
            $admin_bar->add_menu( $help_center_menu );
            $menu_name = $this->container->plugin()->id . '-help-center';
            $admin_bar->remove_menu( $menu_name ); 
        } 
    }   

    /**
     * Load WP dependencies into the page.
     */

    public function register_assets() {
        $asset_file = NFD_HELPCENTER_BUILD_DIR . 'index.asset.php';
        if ( file_exists($asset_file) ) {
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
        }
    }
}

