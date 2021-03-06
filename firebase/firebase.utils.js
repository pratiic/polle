import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { arrFromDocs } from "../components/utils/utils.results";

const firebaseConfig = {
	apiKey: "AIzaSyAbED2K5TC3ekQsK8cfUfhy3HyUPigZIUE",
	authDomain: "polle-3467a.firebaseapp.com",
	projectId: "polle-3467a",
	storageBucket: "polle-3467a.appspot.com",
	messagingSenderId: "754762490196",
	appId: "1:754762490196:web:6b67c5c2cf862d338528c1",
	measurementId: "G-KVVE0X7W63",
};

try {
	firebase.initializeApp(firebaseConfig);
} catch (error) {
	if (!/already exists/.test(error.message)) {
		console.log(error);
	}
}

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const createPoll = async (poll, pollOptions) => {
	const batch = firestore.batch();

	try {
		await firestore.collection("polls").doc(poll.pollID).set(poll);

		pollOptions.forEach((pollOption) => {
			batch.set(
				firestore
					.collection("polls")
					.doc(poll.pollID)
					.collection("options")
					.doc(pollOption.value),
				pollOption
			);
		});

		await batch.commit();

		return {
			message: "created",
		};
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const signUp = async (user) => {
	try {
		const userInfo = await firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password);

		return {
			message: "signed up",
			userInfo: userInfo.user,
		};
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const addUser = async (user, docID) => {
	try {
		await firestore.collection("users").doc(docID).set(user);

		return {
			message: "user added",
		};
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const signIn = async (user) => {
	try {
		await auth.signInWithEmailAndPassword(user.email, user.password);

		return {
			message: "signed in",
		};
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const getCurrentUser = async (userID) => {
	try {
		const userDocRef = await firestore
			.collection("users")
			.doc(userID)
			.get();
		const user = userDocRef.data();
		return user;
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const getUserPolls = async (userID, page, items = 7) => {
	try {
		const pollsCollectionRef = await firestore
			.collection("polls")
			.orderBy("createdAt", "desc")
			.where("createdByID", "==", userID)
			.get();
		const polls = pollsCollectionRef.docs;
		return { polls };
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const getAllPolls = async (page, items = 7, property, value) => {
	try {
		if (Number(page) < 1) {
			return {
				error: "page not found",
			};
		}

		if (Number(page) === 1) {
			const pollsCollRef = await firestore
				.collection("polls")
				.where(
					property ? property : "createdAt",
					property ? "==" : ">",
					value ? value : 1
				)
				.orderBy("createdAt", "desc")
				.limit(items)
				.get();
			const polls = pollsCollRef.docs;
			return { polls };
		}

		const prevPollsCollRef = await firestore
			.collection("polls")
			.where(
				property ? property : "createdAt",
				property ? "==" : ">",
				value ? value : 1
			)
			.orderBy("createdAt", "desc")
			.limit(Number(page) === 1 ? items : (page - 1) * items)
			.get();

		const lastDocRef =
			prevPollsCollRef.docs[prevPollsCollRef.docs.length - 1];

		const pollsCollRef = await firestore
			.collection("polls")
			.where(
				property ? property : "createdAt",
				property ? "==" : ">",
				value ? value : 1
			)
			.orderBy("createdAt", "desc")
			.startAfter(lastDocRef)
			.limit(items)
			.get();

		return { polls: pollsCollRef.docs };
	} catch (error) {
		console.log(error);

		return {
			error: "error occured",
		};
	}
};

export const getPollOptions = async (pollID) => {
	try {
		const optionsCollectionRef = await firestore
			.collection("polls")
			.doc(pollID)
			.collection("options")
			.get();
		const options = optionsCollectionRef.docs;
		console.log(options);
		return { options };
	} catch (error) {
		return {
			error: error,
		};
	}
};

// export const getAllUsers = async () => {
// 	try {
// 		const usersCollectionRef = await firestore.collection("users").get();
// 		const users = (users = usersCollectionRef.docs);
// 		return { users };
// 	} catch (error) {
// 		return {
// 			error: error,
// 		};
// 	}
// };

export const getPoll = async (pollID) => {
	try {
		const [pollDocRef, optionsCollectionRef] = await Promise.all([
			firebase.firestore().collection("polls").doc(pollID).get(),
			firebase
				.firestore()
				.collection("polls")
				.doc(pollID)
				.collection("options")
				.get(),
		]);
		const poll = pollDocRef.data();
		const pollOptions = arrFromDocs(optionsCollectionRef.docs);

		if (pollDocRef.exists) {
			return {
				poll: { ...poll, options: pollOptions },
			};
		} else {
			return { error: "poll does not exist" };
		}
	} catch (error) {
		console.log(error);
		return {
			error: error,
		};
	}
};

export const addVote = async (
	pollID,
	optionID,
	votes,
	votedUserID,
	votedBy
) => {
	try {
		await Promise.all([
			firestore
				.collection("polls")
				.doc(pollID)
				.collection("options")
				.doc(optionID)
				.update({ votes: votes }),
			firestore
				.collection("polls")
				.doc(pollID)
				.collection("votes")
				.doc(votedUserID)
				.set({ option: optionID }),
			firestore
				.collection("polls")
				.doc(pollID)
				.update({
					votedBy: [...votedBy, votedUserID],
				}),
		]);

		return { message: "vote added" };
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const checkIfVoted = async (pollID, currentUserID) => {
	try {
		const voteDocRef = await firestore
			.collection("polls")
			.doc(pollID)
			.collection("votes")
			.doc(currentUserID)
			.get();

		if (voteDocRef.exists) {
			return { voted: true, option: voteDocRef.data().option };
		}

		return { voted: false };
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const searchPolls = async (value) => {
	try {
		const [titleResults, tagsResults] = await Promise.all([
			firestore
				.collection("polls")
				.where("tags", "array-contains", value)
				.get(),
			firestore.collection("polls").where("title", "==", value).get(),
		]);
		return { results: [...titleResults.docs, ...tagsResults.docs] };
	} catch (error) {
		return {
			error: error,
		};
	}
};

export const getVotedPolls = async (page, items = 7, userID) => {
	try {
		if (Number(page) < 1) {
			return {
				error: "page not found",
			};
		}

		if (Number(page) === 1) {
			const pollsCollectionRef = await firestore
				.collection("polls")
				.where("votedBy", "array-contains", userID)
				.orderBy("createdAt", "desc")
				.get();
			return { polls: pollsCollectionRef.docs };
		}

		const prevPollsCollRef = await firestore
			.collection("polls")
			.where("votedBy", "array-contains", userID)
			.orderBy("createdAt", "desc")
			.limit(Number(page) === 1 ? items : (page - 1) * items)
			.get();
		const lastDocRef =
			prevPollsCollRef.docs[prevPollsCollRef.docs.length - 1];

		const pollsCollRef = await firestore
			.collection("polls")
			.where("votedBy", "array-contains", userID)
			.orderBy("createdAt", "desc")
			.startAfter(lastDocRef)
			.limit(items)
			.get();

		return { polls: pollsCollRef.docs };
	} catch (error) {
		console.log(error);

		return {
			error: error.message,
		};
	}
};

const validatePage = (pageNumber) => {
	if (Number(pageNumber) < 0) {
		throw new Error("page not found");
	}

	return true;
};
