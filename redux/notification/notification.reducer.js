const INITIAL_STATE = {
	show: false,
	text: "",
	success: true,
};

export const notificationReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "DISPLAY_NOTIFICATION":
			return {
				...state,
				show: true,
				text: action.payload.text,
				success: action.payload.success,
			};
		case "HIDE_NOTIFICATION":
			return {
				...state,
				show: false,
			};
		default:
			return state;
	}
};
