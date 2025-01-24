import { __ } from '@wordpress/i18n';

const NoResults = () => {
	const resourceLink = window?.nfdHelpCenter?.resourceLink || '#'; // Fallback if resourceLink is not defined

	// Define the content with a placeholder for the link
	const contentWithLink = __(
		'You can try searching our <a href="{link}">Resource center.</a> though to see if there’s a helpful article or video on that subject.',
		'wp-module-help-center'
	);

	// Replace the {link} placeholder with the actual link
	const formattedContent = contentWithLink.replace( '{link}', resourceLink );

	return (
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
	);
};

export default NoResults;
