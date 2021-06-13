export const arrFromDocs = (docs) => {
	const arr = docs.map((doc) => {
		return doc.data();
	});

	return arr;
};

export const validatePageNumber = (pageNumber) => {
	if (isNaN(Number(pageNumber))) {
		return {
			props: {
				error: "page not found",
			},
		};
	}
};

export const validateResult = (result, pageNumber) => {
	if (result.polls && result.polls.length === 0 && Number(pageNumber) > 1) {
		return {
			props: {
				error: "page not found",
			},
		};
	}
};
