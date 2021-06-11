import { combineReducers } from "redux";

import { currentUserReducer } from "./current-user/current-user.reducer";
import { pollsReducer } from "./polls/polls.reducer";
import { chartReducer } from "./chart/chart.reducer";

export default combineReducers({
	currentUser: currentUserReducer,
	polls: pollsReducer,
	chart: chartReducer,
});
