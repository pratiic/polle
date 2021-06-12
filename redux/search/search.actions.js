export const setSearchValue = (searchValue) => {
	return {
		type: "SET_SEARCH_VALUE",
		payload: searchValue,
	};
};

export const setSearching = (searching) => {
	return {
		type: "SET_SEARCHING",
		payload: searching,
	};
};
