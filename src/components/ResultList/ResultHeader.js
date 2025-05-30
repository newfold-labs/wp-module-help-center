import { useSelector } from 'react-redux';

export default function ResultHeader({ noResult, questionBlock }) {
	const { isNewEntry } = useSelector((state) => state.helpcenter);
	return (
		<div className="helpcenter-question-block">
			<div>
				{noResult && isNewEntry
					? ''
					: questionBlock && `"${questionBlock}"`}
			</div>
		</div>
	);
}
