import { useEffect, useRef } from '@wordpress/element';
import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../../store/helpcenterSlice';
function ResultContent( { source, index, questionBlock, content } ) {
	const { isLoading, loadingQuery, loadingIndex, resultContent } =
		useSelector( ( state ) => state.helpcenter );
	const resultBlockRef = useRef();
	const dispatch = useDispatch();

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

				dispatch( helpcenterActions.updateSearchInput( clickedText ) );
				dispatch( helpcenterActions.setAIResultLoading() );

				// set a flag like "triggerSubmit" in the store
				dispatch( helpcenterActions.setTriggerSearch( true ) );
				dispatch( helpcenterActions.setShowBackButton( true ) );
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
