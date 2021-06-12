export const setCurrentUser = (user) => {
	return {
		type: "SET_CURRENT_USER",
		payload: user,
	};
};

export const signUserIn = () => {
	return {
		type: "SIGN_IN",
	};
};

export const signUserOut = () => {
	return {
		type: "SIGN_OUT",
	};
};
