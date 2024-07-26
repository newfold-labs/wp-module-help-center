<?php

namespace NewfoldLabs\WP\Module\HelpCenter;

/**
 * APIs for getting the result from the Type Sense (Multi Site search)
 */
class MultiSearchController extends \WP_REST_Controller {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-multi-search/v1';

    /**
	 * The base of this controller's route
	 *
	 * @var string
	 */
	protected $rest_base = 'multi_search';

    /**
	 * Register the routes for this objects of the controller
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_multi_search_result' ),
					'args'                => array(
						'query' => array(
							'required' => true,
							'type'     => 'string',
						),
					),
					'permission_callback' => array( $this, 'check_permission' ),
				),
			)
		);
    }

    public function get_multi_search_result( \WP_REST_Request $request ) {

		$brand = sanitize_text_field( $request->get_param( 'brand' ) );
		$query = sanitize_text_field( $request->get_param( 'query' ) );
		$apiKey = 'B9wvYIokTPPgXEM3isTqsxbDOva21igT';
		$endpoint = 'https://search.hiive.cloud/multi_search?x-typesense-api-key='.$apiKey;
	
		$params = [
			'searches' => [
				[
					'q' => $query,
					'query_by' => 'post_title,post_content',
					'group_by' => 'post_title',
					'group_limit' => 1,
					'sort_by' => '_text_match:desc,post_likes:desc',
					'filter_by' => 'post_category:=' . $brand,
					'prioritize_token_position' => true,
					'limit_hits' => 3,
					'per_page' => 3,
					'highlight_full_fields' => 'post_title,post_content',
					'collection' => 'nfd_help_articles',
					'page' => 1,
				]
			]
		];
	
		$args = [
			'body' => json_encode( $params ),
			'headers' => [
				'Content-Type' => 'application/json',
				'X-TYPESENSE-API-KEY' => $apiKey,
			],
		];
	
		$response = wp_remote_post( $endpoint, $args );
	
		if ( is_wp_error( $response ) ) {
			return [];
		}
	
		$body = wp_remote_retrieve_body( $response );
		$data =  json_decode( $body, true );
		if ( empty( $data ) ) {
			return new WP_Error( 'no_data', 'No data found', array( 'status' => 404 ) );
		}
	
		return rest_ensure_response( $data );
    }


    /**
	 * Check permissions for routes.
	 *
	 * @return \WP_Error
	 */
	public function check_permission() {
		// if ( ! current_user_can( 'read' ) ) {
		// 	return new \WP_Error(
		// 		'rest_forbidden',
		// 		__( 'You must be authenticated to make this call' ),
		// 		array( 'status' => 401 )
		// 	);
		// }
		 return true;
		//return current_user_can('read');
	}

}