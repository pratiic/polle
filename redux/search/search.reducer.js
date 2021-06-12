const INITIAL_STATE = {
	searchValue: "",
	searching: false,
};

export const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_SEARCH_VALUE":
			return { ...state, searchValue: action.payload };
		case "SET_SEARCHING":
			return { ...state, searching: action.payload };
		default:
			return state;
	}
};
