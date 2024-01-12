import { __ } from '@wordpress/i18n';

const ResourceLink = () => {
	if ( window?.nfdHelpCenter?.resourceLink ) {
		return (
			<p>
				{ __(
					'In the meantime, try searching our',
					'wp-module-help-center'
				) }{ ' ' }
				<a href={ window?.nfdHelpCenter?.resourceLink }>
					{ __( 'Resource center.', 'wp-module-help-center' ) }
				</a>
			</p>
		);
	}
};

export default ResourceLink;
