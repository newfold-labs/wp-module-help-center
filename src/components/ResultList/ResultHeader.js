import { LocalStorageUtils } from '../../utils';

export default function ResultHeader( {
	noResult,
	isNewEntry,
	questionBlock,
} ) {
	return (
		<div className="helpcenter-question-block">
			<div>
				{ noResult && isNewEntry
					? LocalStorageUtils.getSearchInput()
					: questionBlock }
			</div>
		</div>
	);
}
