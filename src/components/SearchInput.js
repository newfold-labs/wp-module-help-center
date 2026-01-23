import moduleAI from '@newfold-labs/wp-module-ai';
import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDispatch } from 'react-redux';
import { useHelpCenterState } from '../hooks/useHelpCenterState';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as GoSearchIcon } from '../icons/paper-airplane.svg';
import {
	Analytics,
	CapabilityAPI,
	formatPostContent,
	getResultMatches,
	LocalStorageUtils,
	MultiSearchAPI,
	saveHelpcenterOption,
} from '../utils';
import HistoryList from './HistoryList';
const SearchInput = () => {
	const isFirstRender = useRef(true);
	const brand = CapabilityAPI.getBrand();
	const dispatch = useDispatch();

	const [errorMsg, setErrorMsg] = useState('');
	const searchData = useHelpCenterState();

	const getInputBoxBottomPosition = (data) => {
		if (data.isFooterVisible && (data.disliked || data.noResult)) {
			return '222px';
		}
		if (data.isFooterVisible) {
			return '375px';
		}
		return '0px';
	};

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return; // skip on initial render
		}
		if (searchData.helpResultHistory?.length > 0) {
			saveHelpcenterOption(searchData.helpResultHistory);
		}
	}, [searchData.helpResultHistory]);

	useEffect(() => {
		if (searchData.triggerSearch) {
			handleSubmit();
			dispatch(helpcenterActions.setTriggerSearch(false));
		}
	}, [searchData.triggerSearch]);

	const populateSearchResult = async (
		postContent,
		postId,
		postTitle,
		searchSource = 'kb'
	) => {
		const resultContentFormatted = postContent
			? formatPostContent(postContent)
			: '';
		// Retrieve existing results from local storage and using the updated persistResult method to store the result
		const result = {
			resultContent: resultContentFormatted,
			postId,
			searchInput: postTitle,
			feedbackSubmitted: null,
		};
		LocalStorageUtils.persistResult(
			result.resultContent,
			postId,
			result.searchInput,
			result.feedbackSubmitted,
			false
		);
		LocalStorageUtils.persistSearchInput(result.searchInput);
		dispatch(helpcenterActions.updateResultContent(result));
		dispatch(helpcenterActions.updateHelpResultHistory(result));

		if (postId) {
			dispatch(helpcenterActions.setNewSearchResult(!!postId));

			Analytics.sendEvent('help_search', {
				label_key: 'term',
				term: postTitle,
				page: window.location.href.toString(),
				search_source: searchSource,
			});
		}
	};

	const checkAndPopulateResult = (hits) => {
		if (hits?.length > 0) {
			const resultMatches = getResultMatches(
				searchData.searchInput,
				hits[0]?.text_match_info?.tokens_matched,
				hits[0]?.text_match_info?.fields_matched
			);
			if (resultMatches) {
				populateSearchResult(
					hits[0].document.post_content,
					hits[0].document.post_id || hits[0].document.id,
					searchData.searchInput
				);
				return true;
			}
		}
		return false;
	};

	const getAIResult = async () => {
		dispatch(helpcenterActions.setAIResultLoading());
		try {
			// Make a new multi-search API call if no match is found
			const multiSearchResults =
				await MultiSearchAPI.fetchMultiSearchResults(
					searchData.searchInput,
					brand
				);
			const hits =
				multiSearchResults?.results?.[0]?.grouped_hits?.[0]?.hits;

			if (checkAndPopulateResult(hits)) {
				return;
			}

			const result = await moduleAI.search.getSearchResult(
				searchData.searchInput,
				'helpcenter'
			);

			if (result.result[0]) {
				populateSearchResult(
					result.result[0].text,
					result.post_id,
					searchData.searchInput,
					'ai'
				);
			} else {
				dispatch(helpcenterActions.setNoResult());
			}
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error('An error occurred:', exception);
			dispatch(helpcenterActions.searchInputCatch());
		} finally {
			dispatch(helpcenterActions.searchInputFinally());
			LocalStorageUtils.persistSearchInput(searchData.searchInput);
		}
	};

	const validateInput = () => {
		const isValid = searchData.searchInput.trim().length > 0;
		setErrorMsg(
			isValid
				? ''
				: __(
						'Please enter a specific search term to get results.',
						'wp-module-help-center'
					)
		);

		return isValid;
	};

	const handleSubmit = async () => {
		if (validateInput()) {
			if (!searchData.triggerSearch) {
				dispatch(helpcenterActions.clearViaLinkSearch());
			}
			dispatch(helpcenterActions.setIsFooterVisible(false));
			dispatch(helpcenterActions.setDisliked(false));
			await getAIResult();
		}
	};

	const handleOnChange = (e) => {
		dispatch(helpcenterActions.updateSearchInput(e.target.value));
	};

	return (
		<div
			className="helpcenter-input-wrapper"
			id="nfdHelpcenterInputWrapper"
			role="search"
			aria-label={__('Search Help Center', 'wp-module-help-center')}
			style={{ bottom: getInputBoxBottomPosition(searchData) }}
		>
			<div className="search-container__wrapper">
				<div className="attribute">
					<p className="hc-input-label">
						{__(
							'Ask anything about WordPress',
							'wp-module-help-center'
						)}
					</p>
					<p className="hc-input-counter">
						<span>
							{searchData.searchInput
								? searchData.searchInput.length
								: 0}
							/144
						</span>
					</p>
				</div>
				<div className="search-container">
					<input
						type="text"
						id="search-input-box"
						value={searchData.searchInput}
						maxLength="144"
						onChange={(e) => handleOnChange(e)}
						onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
					/>
					<button
						aria-label={__('submit text', 'wp-module-help-center')}
						title={__('submit text', 'wp-module-help-center')}
						onClick={() => handleSubmit()}
					>
						<GoSearchIcon />
					</button>
				</div>
				{errorMsg && (
					<p className="hc-input-error-message">{errorMsg}</p>
				)}
				<p></p>
				<HistoryList />
			</div>
		</div>
	);
};

export default SearchInput;
