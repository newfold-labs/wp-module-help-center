<?php

namespace NewfoldLabs\WP\Module\HelpCenter\Data;

/**
 * Contains Brand information.
 */
final class Brands
{

    /**
     * Brand specific data - Bluehost, HostGator
     *
     * @return array
     */
    public static function get_brands()
    {
        return array(
            'bluehost'       => array(
                'brand'   => 'bluehost',
                'name'    => 'Bluehost',
                'url'     => 'https://bluehost.com',
                'helpURL' => 'https://www.bluehost.com/help',
            ),
            'hostgator-us'   => array(
                'brand'   => 'hostgator',
                'name'    => 'HostGator',
                'url'     => 'https://www.hostgator.com',
                'helpUrl' => 'https://www.hostgator.com/help',
            ),
            'hostgator-br'   => array(
                'brand'   => 'hostgator-br',
                'name'    => 'HostGator',
                'url'     => 'https://www.hostgator.com.br',
                'helpUrl' => 'https://suporte.hostgator.com.br/hc/pt-br',
            ),
        );
    }

    /**
     * Sets the hosting brand.
     *
     * @param object $container The brand plugin container.
     */
    public static function set_current_brand( $container ) {
        if ( ! defined('NFD_HELPCENTER_PLUGIN_BRAND') ) {
            $brand = $container->plugin()->brand;
            if (empty($brand)) {
                $brand = 'wordpress';
            }

            if (false !== strpos($brand, 'hostgator')) {
                $region = strtolower($container->plugin()->region);
                $brand  = "hostgator-{$region}";
            }

            $brand = sanitize_title_with_dashes(str_replace('_', '-', $brand));

            define('NFD_HELPCENTER_PLUGIN_BRAND', $brand);
        }
    }

    /**
     * Returns the resource link.
     *
     * @param string $brand_name The brand name for which the link is to be fetched.
     * @return string
     */
    public static function get_resource_link_for_brand( $brand_name ) {
        $brands = self::get_brands();
        if ( isset( $brands[ $brand_name ][ 'helpURL' ] ) ) {
            return $brands[ $brand_name ][ 'helpURL' ];
        }
        return '';
    }
}
