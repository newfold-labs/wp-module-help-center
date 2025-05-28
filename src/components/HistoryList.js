import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as HistoryIcon } from '../icons/reload.svg';

const HistoryList = () => {
	const dispatch = useDispatch();
	const { helpResultHistory } = useSelector( ( state ) => state.helpcenter );
	const handleHistory = ( index ) => {
		dispatch( helpcenterActions.clearViaLinkSearch() );
		dispatch( helpcenterActions.setIsFooterVisible( false ) );
		dispatch(
			helpcenterActions.updateResultContent( helpResultHistory[ index ] )
		);
	};

	return [ ...helpResultHistory ].reverse().map( ( history, index ) => (
		<div
			className="HistoryList"
			key={ index }
			role="button"
			tabIndex={ 0 }
			onClick={ () => handleHistory( index ) }
			onKeyDown={ ( e ) => {
				if ( e.key === 'Enter' || e.key === ' ' ) {
					handleHistory( index );
				}
			} }
		>
			<HistoryIcon />
			<div>{ history.searchInput }</div>
		</div>
	) );
};

export default HistoryList;
