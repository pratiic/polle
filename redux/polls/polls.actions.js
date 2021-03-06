export const setCurrentUserPolls = (polls) => {
	return {
		type: "SET_CURRENT_USER_POLLS",
		payload: polls,
	};
};

export const addCurrentUserPoll = (poll) => {
	return {
		type: "ADD_CURRENT_USER_POLL",
		payload: poll,
	};
};

export const setVotedOption = (votedOption) => {
	return {
		type: "SET_VOTED_OPTION",
		payload: votedOption,
	};
};
