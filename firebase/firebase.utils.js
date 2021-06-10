import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const createPoll = async (poll) => {
	try {
		await firestore.collection("polls").doc(poll.pollID).set(poll);

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

export const getUserPolls = async (userID) => {
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

export const getAllPolls = async () => {
	try {
		const pollsCollectionRef = await firestore
			.collection("polls")
			.orderBy("createdAt", "desc")
			.get();
		const polls = pollsCollectionRef.docs;
		return { polls };
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
		const pollsCollectionRef = await firestore
			.collection("polls")
			.doc(pollID)
			.get();
		const poll = await pollsCollectionRef.data();
		return {
			poll,
		};
	} catch (error) {
		return {
			error: error,
		};
	}
};
