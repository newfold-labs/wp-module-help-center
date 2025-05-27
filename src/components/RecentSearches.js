import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as HistoryIcon } from '../icons/reload.svg';

const RecentSearches = () => {
	const helpResultHistory = useSelector(
		( state ) => state.helpcenter.helpResultHistory
	);

	if ( ! helpResultHistory || helpResultHistory.length === 0 ) {
		return null;
	}
	const dispatch = useDispatch;
	const handleHistory = ( index ) => {
		dispatch( helpcenterActions.setIsFooterVisible( false ) );
		dispatch(
			helpcenterActions.updateResultContent( helpResultHistory[ index ] )
		);
	};

	return (
		<div className="helpcenter-recent-search">
			{ helpResultHistory.map( ( history, index ) => (
				<div
					key={ index }
					className="helpcenter-recent-search--item"
					onClick={ () => handleHistory( index ) }
					role="button"
					tabIndex={ 0 }
					onKeyDown={ ( e ) => {
						if ( e.key === 'Enter' || e.key === ' ' ) {
							handleHistory( index );
						}
					} }
				>
					<HistoryIcon />
					<span>{ history.searchInput }</span>
				</div>
			) ) }
		</div>
	);
};

export default RecentSearches;
