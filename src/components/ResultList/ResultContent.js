
function ResultContent( {
	isLoading,
	loadingQuery,
	loadingIndex,
	source,
	index,
	questionBlock,
	content,
} ) {
	function renderContentOrLoading() {
		// 2) Check loading scenario
		const isAISourceLoading =
			isLoading &&
			source === 'ai' &&
			loadingQuery === questionBlock &&
			loadingIndex === index;

		if ( isAISourceLoading ) {
			return <div className="loading-cursor"></div>;
		}

		// 3) If there's actual content
		if ( content && content.length > 0 ) {
			return (
				<p
					className="helpcenter-results"
					dangerouslySetInnerHTML={ { __html: content } }
				/>
			);
		}

		// 4) Otherwise, render nothing or handle other edge cases
		return null;
	}

	return (
		<div className="helpcenter-result-block">
			{ /* <div className="helpcenter-result-block__aistars">
				<AIStars />
			</div> */ }
			<div>{ renderContentOrLoading() }</div>
		</div>
	);
}

export default ResultContent;
