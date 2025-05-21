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
};

const helpcenterSlice = createSlice({
	name: 'helpcenter',
	initialState,
	reducers: {
		initialDataSet: (state, action) => {
			state.isFooterVisible = action.payload.isFooterVisible;
			state.searchInput = action.payload.SearchInput;
		},
		updateHelpResultHistory: (state, action) => {
			if (state.helpResultHistory.length === 3) {
				state.helpResultHistory.shift();
			}
			state.helpResultHistory.push(action.payload);
		},
		setDisliked: (state, action) => {
			state.disliked = action.payload;
		},
		setIsFooterVisible: (state, action) => {
			state.isFooterVisible = action.payload;
		},
		setNoResult: (state) => {
			state.noResult = true;
		},
		updateHelpEnabled: (state, action) => {
			state.helpEnabled = action.payload;
		},
		updateVisibility: (state, action) => {
			state.visible = action.payload;
		},
		updateResultContent: (state, action) => {
			state.resultContent = action.payload;
		},
		setNewSearchResult: (state, action) => {
			state.isNewResult = action.payload;
			state.searchInput = '';
		},
		updateMultiResults: (state, action) => {
			state.multiResults = action.payload.results;
			state.showSuggestions = action.payload.suggestions;
		},
		updateInitComplete: (state, action) => {
			state.initComplete = action.payload;
		},
		updateSearchInput: (state, action) => {
			state.noResult = false;
			state.errorMsg = '';
			state.searchInput = action.payload;
		},
		searchInputCatch: (state) => {
			state.noResult = true;
			state.isNewResult = true;
		},
		searchInputFinally: (state) => {
			state.searchInput = '';
			state.isLoading = false;
			state.loadingIndex = null;
			state.showSuggestions = false;
		},
		setAIResultLoading: (state) => {
			state.isLoading = true;
			state.showSuggestions = false;
			state.loadingQuery = state.searchInput;
			state.loadingIndex = state.resultContent.length;
		},
	},
});

export const helpcenterActions = helpcenterSlice.actions;

export default helpcenterSlice.reducer;
