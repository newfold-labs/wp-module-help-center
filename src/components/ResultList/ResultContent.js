import { useEffect, useRef } from '@wordpress/element';
import { useSelector } from 'react-redux';
function ResultContent( { source, index, questionBlock, content } ) {
	const { isLoading, loadingQuery, loadingIndex } = useSelector(
		( state ) => state.helpcenter
	);
	const resultBlockRef = useRef();
	useEffect( () => {
		const resultBlock = resultBlockRef.current;

		if ( ! resultBlock ) {
			return;
		}

		const handleClick = ( e ) => {
			const anchor = e.target.closest( 'a[href*="bhmultisite.com/"]' );
			if ( anchor && resultBlock.contains( anchor ) ) {
				e.preventDefault();
				const clickedText = anchor.textContent.trim();
				console.log( 'Clicked text:', clickedText );
			}
		};

		resultBlock.addEventListener( 'click', handleClick );

		return () => {
			resultBlock.removeEventListener( 'click', handleClick );
		};
	}, [ content ] );
	function renderContentOrLoading() {
		const isAISourceLoading =
			isLoading &&
			source === 'ai' &&
			loadingQuery === questionBlock &&
			loadingIndex === index;

		if ( isAISourceLoading ) {
			return <div className="loading-cursor"></div>;
		}

		if ( content && content.length > 0 ) {
			return (
				<p
					className="helpcenter-results"
					dangerouslySetInnerHTML={ { __html: content } }
				/>
			);
		}

		return null;
	}

	return (
		<div className="helpcenter-result-block" ref={ resultBlockRef }>
			<div>{ renderContentOrLoading() }</div>
		</div>
	);
}

export default ResultContent;
