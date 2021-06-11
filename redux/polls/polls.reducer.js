const INITIAL_STATE = {
	currentUserPolls: [],
	votedOption: "",
};

export const pollsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_CURRENT_USER_POLLS":
			return { ...state, currentUserPolls: action.payload };
		case "ADD_CURRENT_USER_POLL":
			return {
				...state,
				currentUserPolls: [action.payload, ...state.currentUserPolls],
			};
		case "SET_VOTED_OPTION":
			return {
				...state,
				votedOption: action.payload,
			};
		default:
			return state;
	}
};
