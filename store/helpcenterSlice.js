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
};

const helpcenterSlice = createSlice( {
	name: 'helpcenter',
	initialState,
	reducers: {
		initialDataSet: ( state, action ) => {
			state.isFooterVisible = action.payload.isFooterVisible;
			state.searchInput = action.payload.SearchInput;
		},
		updateHelpResultHistoryFromDB: ( state, action ) => {
			state.helpResultHistory = action.payload;
		},
		updateHelpResultHistory: ( state, action ) => {
			if (
				! action.payload ||
				typeof action.payload !== 'object' ||
				Array.isArray( action.payload )
			) {
				console.warn(
					'Skipped pushing to helpResultHistory: Invalid payload',
					action.payload
				);
				return;
			}
			if ( state.helpResultHistory.length === 3 ) {
				state.helpResultHistory.shift();
			}
			state.helpResultHistory.push( action.payload );
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
			state.resultContent = action.payload;
		},
		setNewSearchResult: ( state, action ) => {
			state.isNewResult = action.payload;
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
			console.log( 'go back' );
			debugger;
			const history = state.helpResultHistory;

			if ( history.length > 1 ) {
				// Remove the latest clicked result (e.g., bhmultisite)
				history.pop();

				// Get the one before it
				const previous = history[ history.length - 1 ];

				// Assign to resultContent — ensure clone for re-render
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
		},
		setShowBackButton: ( state, action ) => {
			state.showBackButton = action.payload;
		},
	},
} );

export const helpcenterActions = helpcenterSlice.actions;

export default helpcenterSlice.reducer;
