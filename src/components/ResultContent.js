//
import Feedback from './Feedback';
import NoResults from './NoResults';

export const ResultContent = ( {
	content,
	noResult,
	postId,
	source,
	showFeedbackSection,
} ) => {
	if ( noResult ) {
		return <NoResults />;
	}

	if ( content && content.length > 0 ) {
		return (
			<>
				<p
					className="helpcenter-results"
					dangerouslySetInnerHTML={ { __html: content } }
				/>
				{ showFeedbackSection && content && content.length > 0 && (
					<Feedback postId={ postId } source={ source } />
				) }
			</>
		);
	}

	return <></>;
};
