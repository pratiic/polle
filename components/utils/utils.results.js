export const arrFromDocs = (docs) => {
	const arr = docs.map((doc) => {
		return doc.data();
	});

	return arr;
};
