export const displayNotification = (text, success) => {
	return {
		type: "DISPLAY_NOTIFICATION",
		payload: { text, success },
	};
};

export const hideNotification = () => {
	return {
		type: "HIDE_NOTIFICATION",
	};
};

export const showNotification = (text, success) => {
	return (dispatch) => {
		dispatch(displayNotification(text, success));

		setTimeout(() => {
			dispatch(hideNotification());
		}, 3500);
	};
};
