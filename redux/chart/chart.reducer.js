const INITIAL_STATE = {
	chartType: "bar",
};

export const chartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_CHART_TYPE":
			return { ...state, chartType: action.payload };
		default:
			return state;
	}
};
