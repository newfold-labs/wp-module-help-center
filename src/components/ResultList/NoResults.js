import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ResultHeader from './ResultHeader';

const NoResults = ( { isNewResult } ) => {
	const responseRef = useRef( null );
	const resourceLink = window?.nfdHelpCenter?.resourceLink || '#'; // Fallback if resourceLink is not defined

	// Define the content with a placeholder for the link
	const contentWithLink = __(
		'You can try searching our <a href="{link}">Resource center.</a> though to see if there’s a helpful article or video on that subject.',
		'wp-module-help-center'
	);

	// Replace the {link} placeholder with the actual link
	const formattedContent = contentWithLink.replace( '{link}', resourceLink );

	return (
		<div ref={ responseRef } className="helpcenter-response-block">
			<ResultHeader noResult={ true } isNewEntry={ isNewResult } />
			<div className="helpcenter-result-block">
				<div>
					<p>
						{ __(
							'Sorry, I don’t have any information on that topic yet.',
							'wp-module-help-center'
						) }
					</p>
					<p
						dangerouslySetInnerHTML={ {
							__html: formattedContent,
						} }
					/>
				</div>
			</div>
		</div>
	);
};

export default NoResults;
