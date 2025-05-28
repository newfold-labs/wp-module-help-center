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
	recentSearches: [],
};

const helpcenterSlice = createSlice( {
	name: 'helpcenter',
	initialState,
	reducers: {
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

			const alreadyExists = state.helpResultHistory.some(
				( entry ) =>
					entry.searchInput === payload.searchInput &&
					entry.postId === payload.postId
			);
			if ( alreadyExists ) {
				return;
			}

			state.helpResultHistory.push( payload );

			if ( state.helpResultHistory.length > 10 ) {
				state.helpResultHistory.shift();
			}

			// Update back button visibility based on presence of any link-driven entries
			state.showBackButton = state.helpResultHistory.some(
				( entry ) => entry.viaMultisiteLink
			);
		},

		setDisliked: ( state, action ) => {
			state.disliked = action.payload;
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
			const result = action.payload;
			state.resultContent = result;

			if ( state.viaMultisiteLink ) {
				state.helpResultHistory.push( {
					...result,
					viaMultisiteLink: true,
				} );

				if ( state.helpResultHistory.length > 10 ) {
					state.helpResultHistory.shift();
				}

				state.showBackButton = state.helpResultHistory.length > 1;
				state.viaMultisiteLink = false; // Reset only after pushing
			} else {
				// This is a manual search — clear history
				state.helpResultHistory = [];
				state.showBackButton = false;
			}
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
			const history = state.helpResultHistory;
			if ( history.length > 0 ) {
				const last = history[ history.length - 1 ];

				// Removing only if it was a multisite link clicked result
				if ( last.viaMultisiteLink ) {
					history.pop();
				}

				const previous = history[ history.length - 1 ] || last; // fallback

				if ( previous && previous.resultContent ) {
					state.resultContent = {
						...previous,
						resultContent: Array.isArray( previous.resultContent )
							? [ ...previous.resultContent ]
							: previous.resultContent,
					};

					state.searchInput = previous.searchInput || '';
					state.isLoading = false;
					state.initComplete = true;
					state.showSuggestions = true;
				}

				// Hide back button if only one left or none
				state.showBackButton = history.length > 1;
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
