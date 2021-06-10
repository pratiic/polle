import { combineReducers } from "redux";

import { currentUserReducer } from "./current-user/current-user.reducer";
import { pollsReducer } from "./polls/polls.reducer";

export default combineReducers({
	currentUser: currentUserReducer,
	polls: pollsReducer,
});
