export const getCurrentUser = () => {
	if (typeof window !== "undefined") {
		const localStorage = window.localStorage;
		const currentUser = localStorage.getItem("currentUser");

		if (currentUser) {
			return JSON.parse(currentUser);
		}
		return null;
	}
};

export const removeCurrentUser = () => {
	if (typeof window !== "undefined") {
		const localStorage = window.localStorage;
		localStorage.removeItem("currentUser");
	}
};
