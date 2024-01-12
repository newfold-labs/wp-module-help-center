import { __ } from '@wordpress/i18n';
import { ReactComponent as NoResultIllustration } from '../icons/no-result.svg';
import ResourceLink from './ResourceLink';

const NoResults = () => {
	return (
		<div>
			<p>
				{ __(
					'Result based on your search:',
					'wp-module-help-center'
				) }
			</p>
			<h4>
				{ __(
					"Sorry, we don't have any content for that yet.",
					'wp-module-help-center'
				) }
			</h4>
			<hr />
			<NoResultIllustration />
			<p>
				{ __(
					"This tool is being built and doesn't always have a match.",
					'wp-module-help-center'
				) }
			</p>
			<ResourceLink />
			<hr />
		</div>
	);
};

export default NoResults;
