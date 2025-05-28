import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as HistoryIcon } from '../icons/reload.svg';

const HistoryList = () => {
	const dispatch = useDispatch();
	const { helpResultHistory } = useSelector( ( state ) => state.helpcenter );
	const handleHistory = ( historyItem ) => {
		dispatch( helpcenterActions.clearViaLinkSearch() );
		dispatch( helpcenterActions.setIsFooterVisible( false ) );
		dispatch( helpcenterActions.updateResultContent( historyItem ) );
	};

	const reversedHistory = [ ...helpResultHistory ].reverse();

	return reversedHistory.map( ( history, index ) => (
		<div
			className="HistoryList"
			key={ history.searchInput + index }
			role="button"
			tabIndex={ 0 }
			onClick={ () => handleHistory( history ) }
			onKeyDown={ ( e ) => {
				if ( e.key === 'Enter' || e.key === ' ' ) {
					handleHistory( history );
				}
			} }
		>
			<HistoryIcon />
			<div>{ history.searchInput }</div>
		</div>
	) );
};

export default HistoryList;
