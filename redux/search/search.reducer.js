const INITIAL_STATE = {
	searchValue: "",
};

export const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_SEARCH_VALUE":
			return { ...state, searchValue: action.payload };
		default:
			return state;
	}
};
