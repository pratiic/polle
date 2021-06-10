const INITIAL_STATE = {
	currentUserPolls: [],
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
		default:
			return state;
	}
};
