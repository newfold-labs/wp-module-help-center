<?php

namespace NewfoldLabs\WP\Module\HelpCenter\Data;

/**
 * Contains Brand information.
 */
final class Brands {

	/**
	 * Brand-specific data for JS components and resource links.
	 * Keys match NFD_HELPCENTER_PLUGIN_BRAND (bluehost, hostgator-us, hostgator-ar, etc.).
	 * HostGator regions mirror region.js: main, help_phone_number, help_chat, help_kb.
	 *
	 * @return array
	 */
	public static function get_brand_data() {
		$help_chat_latam = 'https://soporte.hostgator.mx/hc/es-419/articles/28439167280915-C%C3%B3mo-entrar-en-contacto-con-Soporte';
		$help_kb_latam   = 'https://soporte.hostgator.mx/hc/es-419';

		return array(
			'bluehost'     => array(
				'brand'               => 'bluehost',
				'name'                => __( 'Bluehost', 'wp-module-help-center' ),
				'url'                 => apply_filters( 'nfd_build_url', 'https://bluehost.com' ),
				'helpURL'             => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/help' ),
				'contactUrl'          => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/contact' ),
				'phone'               => '8884014678',
				'phoneDisplay'        => '888-401-4678',
				'accountName'         => __( 'Bluehost', 'wp-module-help-center' ),
				'hasPhone'            => true,
				'showProDesignBanner' => true,
				'kbClickDomains'      => array( 'bhmultisite.com' ),
				'proDesignUrl'        => apply_filters( 'nfd_build_url', 'https://www.bluehost.com/pro-design-live' ),
				'proDesignHeading'    => __( 'Your dream site is just a click away.', 'wp-module-help-center' ),
				'proDesignSubheading' => __( "Let's build a site you love, together.", 'wp-module-help-center' ),
				'proDesignBody'       => __( 'With Pro Design Live, our expert team bring your vision to life. We help you to create the site you\'ve always dreamed of — tailored to your goals, ready to perform.', 'wp-module-help-center' ),
				'proDesignCta'        => __( 'Start Now', 'wp-module-help-center' ),
			),
			'hostgator-us' => array(
				'brand'               => 'hostgator',
				'name'                => __( 'HostGator', 'wp-module-help-center' ),
				'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.com' ),
				'helpURL'             => apply_filters( 'nfd_build_url', 'https://www.hostgator.com/help' ),
				'contactUrl'          => apply_filters( 'nfd_build_url', 'https://helpchat.hostgator.com' ),
				'phone'               => '8669642867',
				'phoneDisplay'        => '866-964-2867',
				'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
				'hasPhone'            => true,
				'showProDesignBanner' => false,
				'kbClickDomains'      => array(),
			),

			/*
			 * HostGator regions below are NOT YET IN USE — only US sites have the help center capability.
			 * Uncomment when ready to enable help center for these regions.
			 */
			// phpcs:disable Squiz.PHP.CommentedOutCode.Found -- Future regions, keep for easy re-enable.
			// 'hostgator-ar' => array(
			// 'brand'               => 'hostgator-ar',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.ar' ),
			// 'helpURL'             => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'          => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-bo' => array(
			// 'brand'               => 'hostgator-bo',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.bo' ),
			// 'helpURL'             => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'          => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-br' => array(
			// 'brand'               => 'hostgator-br',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.com.br' ),
			// 'helpURL'             => apply_filters( 'nfd_build_url', 'https://suporte.hostgator.com.br/hc/pt-br' ),
			// 'contactUrl'          => apply_filters( 'nfd_build_url', 'https://suporte.hostgator.com.br/hc/pt-br' ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-cl' => array(
			// 'brand'               => 'hostgator-cl',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.cl' ),
			// 'helpURL'              => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'           => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-co' => array(
			// 'brand'               => 'hostgator-co',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.co' ),
			// 'helpURL'              => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'           => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-do' => array(
			// 'brand'               => 'hostgator-do',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.do' ),
			// 'helpURL'              => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'           => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-ec' => array(
			// 'brand'               => 'hostgator-ec',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.net.ec' ),
			// 'helpURL'              => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'           => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-mx' => array(
			// 'brand'               => 'hostgator-mx',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.mx' ),
			// 'helpURL'              => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'           => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-pe' => array(
			// 'brand'               => 'hostgator-pe',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.pe' ),
			// 'helpURL'              => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'           => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// 'hostgator-uy' => array(
			// 'brand'               => 'hostgator-uy',
			// 'name'                => __( 'HostGator', 'wp-module-help-center' ),
			// 'url'                 => apply_filters( 'nfd_build_url', 'https://www.hostgator.uy' ),
			// 'helpURL'              => apply_filters( 'nfd_build_url', $help_kb_latam ),
			// 'contactUrl'           => apply_filters( 'nfd_build_url', $help_chat_latam ),
			// 'phone'                => '',
			// 'phoneDisplay'        => '',
			// 'accountName'         => __( 'HostGator', 'wp-module-help-center' ),
			// 'hasPhone'            => false,
			// 'showProDesignBanner' => false,
			// 'kbClickDomains'      => array(),
			// ),
			// phpcs:enable Squiz.PHP.CommentedOutCode.Found
		);
	}

	/**
	 * Get the brand data for the given brand key.
	 *
	 * @param string $brand_key NFD_HELPCENTER_PLUGIN_BRAND (e.g. bluehost, hostgator-us).
	 * @return array
	 */
	public static function get_data_for_brand( $brand_key ) {
		$data = self::get_brand_data();

		// 1. Exact match: return the requested brand's data if it exists.
		if ( isset( $data[ $brand_key ] ) ) {
			return $data[ $brand_key ];
		}

		// 2. HostGator fallback: for hostgator-* keys not defined (e.g. hostgator-xy, or future regions
		// that are commented out), use hostgator-us as the default. Only US has help center capability.
		if ( 0 === strpos( $brand_key, 'hostgator' ) ) {
			return $data['hostgator-us'] ?? $data['bluehost'];
		}

		// 3. Unknown brand: fall back to bluehost.
		return $data['bluehost'];
	}

	/**
	 * Returns the resource link (help URL) for the given brand.
	 *
	 * @param string $brand_key NFD_HELPCENTER_PLUGIN_BRAND.
	 * @return string
	 */
	public static function get_resource_link_for_brand( $brand_key ) {
		$all_data = self::get_brand_data();
		if ( ! isset( $all_data[ $brand_key ] ) && 0 !== strpos( $brand_key, 'hostgator' ) ) {
			return '';
		}
		$data = self::get_data_for_brand( $brand_key );
		return $data['helpURL'] ?? '';
	}

	/**
	 * Sets the hosting brand and defines NFD_HELPCENTER_PLUGIN_BRAND.
	 *
	 * Called from the module bootstrap (before the help center loads). Uses the container's
	 * plugin()->brand and plugin()->region to determine the brand key.
	 *
	 * For HostGator: appends region → hostgator-us, hostgator-br, etc. This is used by:
	 * - HelpCenter.php (brandConfig, resourceLink)
	 * - MultiSearchController (filter_by post_category) — the TypeSense index must have articles
	 *   with post_category matching this value (e.g. "hostgator-us" or "hostgator" depending on index).
	 *
	 * @param object $container The brand plugin container (from Newfold Module Loader).
	 */
	public static function set_current_brand( $container ) {
		if ( ! defined( 'NFD_HELPCENTER_PLUGIN_BRAND' ) ) {
			// Get brand from container (set in plugin)
			$brand = $container->plugin()->brand;
			if ( empty( $brand ) ) {
				$brand = 'WordPress';
			}

			// Only HostGator uses region; Bluehost does not.
			// Region may be empty in the container but is populated as "us" in the runtime by default.
			// But only US has help center capability for now see canAccessHelpCenter in Site Model in Hiive.
			if ( false !== strpos( $brand, 'hostgator' ) ) {
				$region = strtolower( $container->plugin()->region ?? '' );
				$brand  = ! empty( $region ) ? 'hostgator-' . $region : 'hostgator';
			}

			$brand = sanitize_title_with_dashes( str_replace( '_', '-', $brand ) );

			define( 'NFD_HELPCENTER_PLUGIN_BRAND', $brand );
		}
	}
}
