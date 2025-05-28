import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	visible: false,
	helpEnabled: false,
	noResult: false,
	isNewResult: false,
	searchInput: '',
	isLoading: false,
	loadingQuery: null,
	loadingIndex: null,
	resultContent: [],
	multiResults: {},
	showSuggestions: false,
	initComplete: false,
	disliked: false,
	isFooterVisible: true,
	helpResultHistory: [],
	triggerSearch: false,
	showBackButton: false,
	viaLinkSearch: [],
};

const helpcenterSlice = createSlice( {
	name: 'helpcenter',
	initialState,
	reducers: {
		clearViaLinkSearch: ( state ) => {
			state.showBackButton = false;
			state.viaLinkSearch = [];
		},
		initialDataSet: ( state, action ) => {
			state.isFooterVisible = action.payload.isFooterVisible;
			state.searchInput = action.payload.SearchInput;
		},
		setRecentSearchesFromDB: ( state, action ) => {
			state.recentSearches = action.payload;
		},
		updateHelpResultHistory: ( state, action ) => {
			const payload = action.payload;

			if (
				! payload ||
				typeof payload !== 'object' ||
				Array.isArray( payload )
			) {
				console.warn(
					'Skipped updateHelpResultHistory due to invalid payload:',
					payload
				);
				return;
			}
			if ( ! state.searchInput ) {
				if ( state.viaLinkSearch.length === 10 ) {
					state.viaLinkSearch.shift();
				}
				state.viaLinkSearch.push( action.payload );
			}
		},

		setDisliked: ( state, action ) => {
			state.disliked = action.payload;
		},
		setLiked: ( state, action ) => {
			state.helpResultHistory[
				state.helpResultHistory.length - 1
			].feedbackSubmitted = action.payload;
		},
		setIsFooterVisible: ( state, action ) => {
			state.isFooterVisible = action.payload;
		},
		setNoResult: ( state ) => {
			state.noResult = true;
		},
		updateHelpEnabled: ( state, action ) => {
			state.helpEnabled = action.payload;
		},
		updateVisibility: ( state, action ) => {
			state.visible = action.payload;
		},
		updateResultContent: ( state, action ) => {
			state.noResult = false;
			state.resultContent = action.payload;
			state.viaLinkSearch.push( action.payload );
		},
		setNewSearchResult: ( state ) => {
			state.isNewResult = true;
			state.searchInput = '';
		},
		updateMultiResults: ( state, action ) => {
			state.multiResults = action.payload.results;
			state.showSuggestions = action.payload.suggestions;
		},
		updateInitComplete: ( state, action ) => {
			state.initComplete = action.payload;
		},
		updateSearchInput: ( state, action ) => {
			state.noResult = false;
			state.errorMsg = '';
			state.searchInput = action.payload;
		},
		searchInputCatch: ( state ) => {
			state.noResult = true;
			state.isNewResult = true;
		},
		searchInputFinally: ( state ) => {
			state.searchInput = '';
			state.isLoading = false;
			state.loadingIndex = null;
			state.showSuggestions = false;
		},
		setAIResultLoading: ( state ) => {
			state.isLoading = true;
			state.showSuggestions = false;
			state.loadingQuery = state.searchInput;
		},
		setTriggerSearch: ( state, action ) => {
			state.triggerSearch = action.payload;
		},
		goBackInHistory: ( state ) => {
			if ( state.viaLinkSearch.length >= 1 ) {
				state.viaLinkSearch.pop();
				state.resultContent =
					state.viaLinkSearch[ state.viaLinkSearch.length - 1 ];
			}

			if ( state.viaLinkSearch.length === 1 ) {
				state.showBackButton = false;
			}
		},
		setShowBackButton: ( state, action ) => {
			state.showBackButton = action.payload;
		},
		addRecentSearchesEntry: ( state, action ) => {
			const result = action.payload;

			if ( ! result || typeof result !== 'object' || ! result.postId ) {
				console.warn( 'Invalid recent search entry:', result );
				return;
			}

			// no double entries
			state.recentSearches = state.recentSearches.filter(
				( entry ) => entry.postId !== result.postId
			);

			// recent first
			state.recentSearches.unshift( result );

			// showing only 3 for now
			if ( state.recentSearches.length > 3 ) {
				state.recentSearches.pop(); // Remove the oldest (last)
			}
		},
		setViaMultisiteLink: ( state, action ) => {
			state.viaMultisiteLink = action.payload;
		},
	},
} );

export const helpcenterActions = helpcenterSlice.actions;

export default helpcenterSlice.reducer;
