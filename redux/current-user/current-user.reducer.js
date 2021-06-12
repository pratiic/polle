const INITIAL_STATE = {
	currentUser: null,
	signedIn: false,
};

export const currentUserReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_CURRENT_USER":
			return {
				...state,
				currentUser: action.payload,
			};
		case "SIGN_IN":
			return {
				...state,
				signedIn: true,
			};
		case "SIGN_OUT":
			return {
				...state,
				signedIn: false,
			};
		default:
			return state;
	}
};
